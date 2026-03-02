import flet as ft
import google.generativeai as genai
import os
from dotenv import load_dotenv

# API Key लोड करना (.env फाइल से)
load_dotenv()
GENAI_KEY = os.getenv("GEMINI_API_KEY")

# Gemini सेटअप
genai.configure(api_key=GENAI_KEY)
model = genai.GenerativeModel('gemini-pro')

def main(page: ft.Page):
    page.title = "Krynox AI Studio"
    page.theme_mode = ft.ThemeMode.DARK
    page.window_maximized = True
    page.bgcolor = "#0b0e14"

    # UI घटक
    editor = ft.TextField(
        multiline=True,
        min_lines=25,
        max_lines=30,
        text_style=ft.TextStyle(font_family="Consolas", size=14, color="amber_100"),
        hint_text="# AI generated code will appear here...",
        bgcolor="#161b22",
        border_color="#30363d",
        expand=True,
    )

    chat_input = ft.TextField(
        hint_text="Ask AI to build something...",
        expand=True,
        border_color="blue",
        on_submit=lambda e: generate_code(e)
    )

    progress_bar = ft.ProgressBar(visible=False, color="blue")

    # फंक्शन: AI से कोड मांगना
    def generate_code(e):
        if not chat_input.value: return
        
        progress_bar.visible = True
        chat_input.disabled = True
        page.update()

        try:
            full_prompt = f"Write only the Python code for: {chat_input.value}. Do not explain, just give code."
            response = model.generate_content(full_prompt)
            # कोड को क्लीन करना
            clean_code = response.text.replace("```python", "").replace("```", "").strip()
            editor.value = clean_code
        except Exception as err:
            editor.value = f"# Error: {str(err)}"
        
        progress_bar.visible = False
        chat_input.disabled = False
        chat_input.value = ""
        page.update()

    # लेआउट डिजाइन
    page.add(
        ft.Column([
            ft.Row([
                ft.Text("Krynox AI Studio", size=24, weight="bold")
            ]),
            progress_bar,
            ft.Row([
                # Left Panel
                ft.Container(content=editor, expand=3),
                # Right Panel (Assistant)
                ft.Container(
                    content=ft.Column([
                        ft.Text("Krynox Assistant", size=18, color="blue"),
                        chat_input,
                        ft.ElevatedButton("Generate", on_click=generate_code),
                        ft.Divider(),
                        ft.Text("Quick Tasks:", size=12, color="grey"),
                        ft.TextButton("Create Login UI", on_click=lambda _: setattr(chat_input, 'value', "Create a Flet login page")),
                        ft.TextButton("Snake Game", on_click=lambda _: setattr(chat_input, 'value', "Write a Snake game in Python")),
                    ]),
                    expand=1, padding=20, bgcolor="#0d1117", border_radius=10
                )
            ], expand=True)
        ], expand=True)
    )

ft.app(target=main)
