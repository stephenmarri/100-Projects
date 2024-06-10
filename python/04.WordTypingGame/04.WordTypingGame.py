import curses
from curses import wrapper


def display_text(stdscr, loaded_text: str, typed_text: list, max_rows):
    stdscr.refresh()
    stdscr.clear()
    stdscr.addstr(0, 0, loaded_text, curses.color_pair(1))

    char_index = 0
    row_index, col_index = 0, 0
    for i in typed_text:
        if i == loaded_text[char_index]:
            selected_color = 2
        else:
            selected_color = 3
        if row_index >= max_rows:
            row_index = 0
            col_index += 1

        stdscr.addstr(col_index, row_index, loaded_text[char_index], curses.color_pair(selected_color))
        char_index += 1
        row_index += 1


def load_text() -> str:
    list_text =["Uncertainty and expectation are the joys of life. Security is an insipid thing",
    "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover."]
    return list_text[1]


def main(stdscr):
    text_loaded = load_text()
    text_typed = []

    curses.init_pair(1, curses.COLOR_WHITE, curses.COLOR_BLACK)
    curses.init_pair(2, curses.COLOR_GREEN, curses.COLOR_BLACK)
    curses.init_pair(3, curses.COLOR_RED, curses.COLOR_BLACK)
    scr_rows, scr_cols = stdscr.getmaxyx()

    while True:
        display_text(stdscr, text_loaded, text_typed, scr_cols)

        try:
            key_pressed = stdscr.getkey()
        except:
            continue

        if ord(key_pressed) == 27:
            break

        if key_pressed in ("KEY_BACKSPACE", '\b', "\x7f"):
            text_typed.pop()
        else:
            text_typed.append(key_pressed)


wrapper(main)

