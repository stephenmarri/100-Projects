import ast
import curses
import math
import random
from curses import wrapper
import time

start_time = time.time()


def display_text(stdscr, loaded_text: str, typed_text: list, max_rows):
    global dict_sttus
    dict_sttus = {
        'int_mistakes': 0,
        'str_time': '',
        'wpm': 0,
        'accuracy': 0
    }

    stdscr.refresh()
    stdscr.clear()

    char_index = 0
    col_index, row_index = 0, 2
    stdscr.addstr(row_index, col_index, loaded_text, curses.color_pair(1))
    for i in typed_text:
        if i == loaded_text[char_index]:
            selected_color = 2
        else:
            dict_sttus['int_mistakes'] = int(dict_sttus['int_mistakes']) + 1
            selected_color = 3
        if col_index >= max_rows:
            col_index = 0
            row_index += 1

        stdscr.addstr(row_index, col_index, loaded_text[char_index], curses.color_pair(selected_color))
        char_index += 1
        col_index += 1

    # show status
    if len(typed_text) > 0:
        accuracy = math.floor(((len(typed_text) - dict_sttus['int_mistakes']) / len(typed_text)) * 100)
        time_elapsed = round(time.time() - start_time)
        wpm = round((len(typed_text) / (time_elapsed )) * 60)/5
        status_text = f"wpm: {wpm}, Mistakes: {dict_sttus['int_mistakes']}, Accuracy: {accuracy}%, Time: {time_elapsed} seconds"
        stdscr.addstr(0, 0, status_text, curses.color_pair(1))
    else:
        stdscr.addstr(0, 0, "Start typing...", curses.color_pair(1))


def load_text() -> str:
    with open('quotes.json', 'r') as file:
        text = file.read()
    list_text = ast.literal_eval(text)
    rand_int = random.randint(0, len(list_text) - 1)
    return list_text[0]


def wpm_game(stdscr):
    text_loaded = load_text()
    text_typed = []
    scr_rows, scr_cols = stdscr.getmaxyx()

    while True:
        display_text(stdscr, text_loaded, text_typed, scr_cols)

        if len(text_typed) == len(text_loaded):
            break

        try:
            key_pressed = stdscr.getkey()
            if ord(key_pressed) == 27:
                break
        except:
            continue

        if key_pressed in ("KEY_BACKSPACE", '\b', "\x7f"):
            text_typed.pop()
        else:
            text_typed.append(key_pressed)


def main(stdscr):
    time.sleep(1)

    curses.init_pair(1, curses.COLOR_WHITE, curses.COLOR_BLACK)
    curses.init_pair(2, curses.COLOR_GREEN, curses.COLOR_BLACK)
    curses.init_pair(3, curses.COLOR_RED, curses.COLOR_BLACK)

    while True:
        wpm_game(stdscr)
        stdscr.addstr(10, 0,  "You completed the text! Press any key to continue...")
        key = stdscr.getkey()

        if ord(key) == 27:
            break


wrapper(main)
