import flet as ft
import google.generativeai as genai
import os
import subprocess
import threading
import psutil
import time

# --- AI CONFIGURATION ---
GEMINI_API_KEY = "AIzaSyB2c1zI4bTxM_4FiRq1g1bJcxraDq6scYE"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# --- FILE EXPLORER FUNCTIONS ---
def get_directory_contents(path="."):
    """Get files and directories in the specified path"""
    try:
        items = []
        for item in os.listdir(path):
            item_path = os.path.join(path, item)
            if os.path.isfile(item_path):
                items.append({"name": item, "type": "file", "path": item_path})
            elif os.path.isdir(item_path):
                items.append({"name": item, "type": "dir", "path": item_path})
        return sorted(items, key=lambda x: (x["type"], x["name"]))
    except PermissionError:
        return []
    except Exception:
        return []

def load_file_content(path):
    """Load file content into editor"""
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    except Exception as e:
        return f"# Error loading file: {str(e)}"

def main(page: ft.Page):
    page.title = "Krynox AI Studio - Professional Edition"
    page.theme_mode = ft.ThemeMode.DARK
    page.window_maximized = True
    page.bgcolor = "#0d1117"
    page.padding = 0

    # --- STATE & COMPONENTS ---
    
    # Main Code Editor (Enhanced with Consolas font)
    editor = ft.TextField(
        multiline=True,
        min_lines=30,
        expand=True,
        text_style=ft.TextStyle(font_family="Consolas", size=14, color="blue100"),
        bgcolor="#0d1117",
        border=ft.Border.all(0, "transparent"),
        hint_text="# Write or Generate Code here...",
        content_padding=15
    )

    # Terminal Output Window
    terminal_output = ft.Text(value="Terminal Ready...\n", color="white", size=12, font_family="Consolas")
    terminal_container = ft.Container(
        content=ft.Column([terminal_output], scroll=ft.ScrollMode.ALWAYS),
        bgcolor="#000000",
        height=150,
        padding=10,
        expand=False,
    )

    # File Picker for Save/Open operations
    def on_file_result(e):
        if e.path:
            try:
                with open(e.path, "w", encoding="utf-8") as f:
                    f.write(editor.value)
                page.snack_bar = ft.SnackBar(ft.Text(f"File saved: {e.path}"), bgcolor="green")
            except Exception as ex:
                page.snack_bar = ft.SnackBar(ft.Text(f"Save Error: {ex}"), bgcolor="red")
            page.snack_bar.open = True
            page.update()

    # Modern FilePicker Fix
    file_picker = ft.FilePicker()
    file_picker.on_result = on_file_result
    page.overlay.append(file_picker)

    # --- FUNCTIONS ---

    # Enhanced Editor Features
    def fix_code_errors(e):
        """Use AI to fix code errors"""
        if not editor.value:
            page.show_snack_bar(ft.SnackBar(ft.Text("No code to fix!")))
            return
        
        ai_loader.visible = True
        page.update()
        
        try:
            prompt = f"Fix any errors in this Python code and improve it:\n\n{editor.value}"
            response = model.generate_content(prompt)
            editor.value = response.text
            page.show_snack_bar(ft.SnackBar(ft.Text("Code fixed by AI!")))
        except Exception as ex:
            terminal_output.value += f"\nAI Fix Error: {str(ex)}"
        
        ai_loader.visible = False
        page.update()

    def explain_code(e):
        """Get AI explanation of the code"""
        if not editor.value:
            page.show_snack_bar(ft.SnackBar(ft.Text("No code to explain!")))
            return
        
        ai_loader.visible = True
        page.update()
        
        try:
            prompt = f"Explain what this Python code does in simple terms:\n\n{editor.value}"
            response = model.generate_content(prompt)
            terminal_output.value += f"\nAI Explanation:\n{response.text}\n"
        except Exception as ex:
            terminal_output.value += f"\nAI Explanation Error: {str(ex)}"
        
        ai_loader.visible = False
        page.update()

    def run_code(e):
        """Execute code and display output in terminal"""
        terminal_output.value = ">>> Executing...\n"
        page.update()
        
        # Save code to temporary file
        with open("krynox_temp.py", "w", encoding="utf-8") as f:
            f.write(editor.value)
            
        try:
            result = subprocess.run(["python", "krynox_temp.py"], capture_output=True, text=True)
            terminal_output.value += result.stdout + result.stderr
        except Exception as ex:
            terminal_output.value += f"Error: {str(ex)}"
        page.update()

    def clear_terminal(e):
        """Clear terminal output"""
        terminal_output.value = ">>> Terminal Cleared.\n"
        page.update()

    def ask_ai(e):
        """Generate code using AI assistant"""
        if not chat_input.value: return
        ai_loader.visible = True
        page.update()

        try:
            prompt = f"Write clean Python code for: {chat_input.value}. No intro, no backticks."
            response = model.generate_content(prompt)
            editor.value = response.text
        except Exception as ex:
            terminal_output.value += f"\nAI Error: {str(ex)}"
        
        ai_loader.visible = False
        chat_input.value = ""
        page.update()

    # --- UI LAYOUT ---

    # System Info Components
    cpu_text = ft.Text("CPU: 0%", size=10, color="white")
    ram_text = ft.Text("RAM: 0%", size=10, color="white")
    status_bar = ft.Container(
        content=ft.Row([
            cpu_text,
            ft.VerticalDivider(width=20),
            ram_text,
        ], alignment=ft.MainAxisAlignment.END),
        bgcolor="#161b22",
        padding=5,
        height=25
    )
    
    # Function to update system info
    def update_system_info():
        """Update CPU and RAM usage display"""
        cpu_percent = psutil.cpu_percent(interval=1)
        ram_percent = psutil.virtual_memory().percent
        cpu_text.value = f"CPU: {cpu_percent:.1f}%"
        ram_text.value = f"RAM: {ram_percent:.1f}%"
        try:
            page.update()
        except:
            pass  # Ignore errors when page is closed
    
    # Start system monitoring in background
    def monitor_system():
        while True:
            update_system_info()
            time.sleep(1)
    
    threading.Thread(target=monitor_system, daemon=True).start()

    # Top Navigation Bar
    def toggle_theme(e):
        page.theme_mode = ft.ThemeMode.LIGHT if page.theme_mode == ft.ThemeMode.DARK else ft.ThemeMode.DARK
        theme_btn.icon = "dark_mode" if page.theme_mode == ft.ThemeMode.LIGHT else "light_mode"
        page.update()

    theme_btn = ft.IconButton(icon="light_mode", on_click=toggle_theme, icon_color="yellow", tooltip="Toggle Theme")
    
    nav_bar = ft.Container(
        content=ft.Row([
            ft.Text(" KRYNOX STUDIO ", weight="bold", size=18, color="blue"),
            ft.IconButton(icon="play_arrow", on_click=run_code, icon_color="green", tooltip="Run Code"),
            ft.IconButton(icon="save", on_click=lambda _: file_picker.save_file(), icon_color="white", tooltip="Save File"),
            ft.IconButton(icon="delete_forever", on_click=clear_terminal, icon_color="red", tooltip="Clear Terminal"),
            ft.IconButton(icon="restart_alt", on_click=lambda _: editor.__setattr__('value', ""), icon_color="red", tooltip="Clear Editor"),
            ft.IconButton(icon="bug_report", on_click=fix_code_errors, icon_color="yellow", tooltip="Fix Code"),
            ft.IconButton(icon="help", on_click=explain_code, icon_color="cyan", tooltip="Explain Code"),
            ft.VerticalDivider(),
            theme_btn,
        ]),
        bgcolor="#161b22",
        padding=10,
    )

    # Sidebar AI Assistant
    chat_input = ft.TextField(hint_text="Ask AI...", expand=True, text_size=12, border_radius=10, on_submit=ask_ai)
    ai_loader = ft.ProgressBar(visible=False, color="blue")
    
    # File Explorer Components
    current_path = ft.Text("Current Path: " + os.getcwd(), size=11, color="grey")
    file_list = ft.Column([], spacing=2, scroll=ft.ScrollMode.ALWAYS)
    
    def update_file_explorer(path=None):
        """Update the file explorer with current directory contents"""
        if path is None:
            path = os.getcwd()
        
        current_path.value = f"Current Path: {path}"
        file_list.controls.clear()
        
        # Add parent directory option
        if path != os.path.abspath(os.sep):  # Not root directory
            parent_path = os.path.dirname(path)
            parent_btn = ft.ListTile(
                leading=ft.Icon("folder", color="orange"),
                title=ft.Text(".. (Parent)", size=12),
                on_click=lambda _: update_file_explorer(parent_path)
            )
            file_list.controls.append(parent_btn)
        
        # Add current directory contents
        items = get_directory_contents(path)
        for item in items:
            if item["type"] == "dir":
                icon = ft.Icon("folder", color="orange")
                on_click = lambda _, p=item["path"]: update_file_explorer(p)
            else:
                icon = ft.Icon("description", color="white")
                on_click = lambda _, p=item["path"]: load_file(p)
            
            file_list.controls.append(
                ft.ListTile(
                    leading=icon,
                    title=ft.Text(item["name"], size=12),
                    on_click=on_click
                )
            )
        
        page.update()
    
    def load_file(path):
        """Load selected file into editor"""
        content = load_file_content(path)
        editor.value = content
        page.show_snack_bar(ft.SnackBar(ft.Text(f"Loaded: {os.path.basename(path)}")))
        page.update()
    
    sidebar = ft.Container(
        content=ft.Column([
            ft.Text("AI CO-PILOT", weight="bold", color="blue"),
            ai_loader,
            chat_input,
            ft.ElevatedButton("Ask Krynox", icon="stars", on_click=ask_ai, width=200),
            ft.Divider(),
            ft.Text("File Explorer", size=12, color="grey", weight="bold"),
            current_path,
            ft.ElevatedButton("Refresh", icon="refresh", on_click=lambda _: update_file_explorer()),
            ft.Container(
                content=file_list,
                height=300,
                bgcolor="#161b22",
                border_radius=5,
                padding=5
            ),
        ], spacing=15),
        width=250,
        bgcolor="#0d1117",
        padding=20,
        border=ft.border.only(right=ft.border.BorderSide(1, "#30363d"))
    )
    
    # Initialize file explorer
    update_file_explorer()

    # Main View
    main_view = ft.Column([
        ft.Container(content=editor, expand=True, padding=10),
        terminal_container
    ], expand=True, spacing=0)

    # Add all components to the page
    page.add(
        nav_bar,
        ft.Row([
            sidebar,
            main_view
        ], expand=True, spacing=0)
    )

ft.app(target=main)
