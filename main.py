import flet as ft
import google.generativeai as genai
import os

# --- CONFIGURATION ---
GEMINI_API_KEY = "AIzaSyB2c1zI4bTxM_4FiRq1g1bJcxraDq6scYE" # अपनी Key यहाँ डालें
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def main(page: ft.Page):
    page.title = "Krynox AI Studio Pro"
    page.theme_mode = ft.ThemeMode.DARK
    page.window_maximized = True
    page.padding = 20

    # फाइल सेव करने के लिए FilePicker सेटअप
    def on_file_result(e):
        if e.path:
            with open(e.path, "w", encoding="utf-8") as f:
                f.write(editor.value)
            page.snack_bar = ft.SnackBar(ft.Text(f"File saved successfully at: {e.path}"), bgcolor="green")
            page.snack_bar.open = True
            page.update()

    file_picker = ft.FilePicker()
    file_picker.on_result = on_file_result
    page.overlay.append(file_picker)

    # --- UI COMPONENTS ---
    editor = ft.TextField(
        multiline=True,
        min_lines=25,
        max_lines=35,
        text_style=ft.TextStyle(font_family="Consolas", size=14, color="green200"),
        hint_text="# Generated code will appear here...",
        expand=True,
        bgcolor="#1a1a1a",
        border_color="#333333",
    )

    chat_input = ft.TextField(
        hint_text="Ask Krynox AI (e.g. Write a python script to send emails)",
        expand=True,
        on_submit=lambda e: generate_code(e)
    )

    progress_bar = ft.ProgressBar(visible=False, color="blue")

    # --- FUNCTIONS ---
    def generate_code(e):
        if not chat_input.value: return
        progress_bar.visible = True
        chat_input.disabled = True
        page.update()

        try:
            prompt = f"Write only the clean Python code for: {chat_input.value}. No intro, no summary."
            response = model.generate_content(prompt)
            clean_code = response.text.replace("```python", "").replace("```", "").strip()
            editor.value = clean_code
        except Exception as ex:
            editor.value = f"# Error: {str(ex)}"
        
        progress_bar.visible = False
        chat_input.disabled = False
        chat_input.value = ""
        page.update()

    def save_file(e):
        # फाइल सेव करने वाली विंडो खोलना
        file_picker.save_file(file_name="generated_code.py", allowed_extensions=["py", "txt", "html", "js"])

    # --- LAYOUT ---
    page.add(
        ft.Column([
            ft.Row([
                ft.Icon("stars", color="blue", size=30),
                ft.Text("KRYNOX AI STUDIO PRO", size=28, weight="bold"),
                ft.VerticalDivider(),
                ft.ElevatedButton("Save Code", icon="save", on_click=save_file, bgcolor="blue700", color="white")
            ]),
            progress_bar,
            ft.Row([
                # Code Editor View
                ft.Container(content=editor, expand=3, border_radius=10, bgcolor="#1a1a1a", padding=10),
                # Sidebar Chat
                ft.Container(
                    content=ft.Column([
                        ft.Text("AI ASSISTANT", weight="bold", color="blue"),
                        chat_input,
                        ft.ElevatedButton("Generate", icon="auto_awesome", on_click=generate_code),
                        ft.Divider(),
                        ft.Text("History / Tips:", size=12, color="grey"),
                        ft.Text("1. Write code clearly\n2. Use 'Save' to export\n3. Gemini Pro Power", size=11, color="grey500")
                    ]),
                    expand=1, bgcolor="#1e1e1e", padding=20, border_radius=10
                )
            ], expand=True)
        ], expand=True)
    )

ft.app(target=main)