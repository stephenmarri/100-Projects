import os


def print_screen():
    global gl_quit_game
    os.system('cls')
    if not gl_quit_game:
        print_board()

        if check_for_winner():
            usr_input = str(input(f'Woohoo!! [{toggle_turn(gl_turn)}] won !!\nDo you want to play again?[Y\\N]: '))
            if usr_input.upper() in ["Y", "YES", "YE"]:
                new_game()
                print_screen()
            else:
                gl_quit_game = True
        else:
            print_sub_text()


def toggle_turn(turn) -> str:
    return "X" if turn == "O" else "O"


def print_board():
    for row_index in range(0, 3):
        lst_index = (3 * row_index)
        for col_index in range(0, 3):
            print(gl_squares[lst_index + col_index], "| " if col_index < 2 else "\n", end="")
        if row_index < 2:
            print("-" * 10)


def print_sub_text():
    global gl_squares, gl_err_message, gl_turn
    usr_input = str(input(f'\nIts [{gl_turn.upper()}]\'s turn. {gl_err_message}Please enter a move: '))
    if is_move_valid(usr_input):
        gl_err_message = ""
        usr_move = int(usr_input) - 1
        gl_squares[usr_move] = gl_turn
        gl_turn = toggle_turn(gl_turn)
    print_screen()


def is_move_valid(usr_inp: str) -> bool:
    global gl_err_message
    if usr_inp.isdigit():
        if 0 <= int(usr_inp) - 1 <= 8:
            if gl_squares[int(usr_inp) - 1] == gl_filler:
                return True
            else:
                gl_err_message = "Position already filled. "
        else:
            gl_err_message = "Enter a value between 1 and 9. "
    else:
        gl_err_message = "Enter a valid digit. "
    return False


def check_for_winner() -> bool:
    lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for line in lines:
        [a, b, c] = gl_squares[line[0]], gl_squares[line[1]], gl_squares[line[2]]
        if a != gl_filler and a == b and a == c:
            return True
    return False


def new_game():
    global gl_squares, gl_turn
    gl_turn = "X"
    gl_squares = [gl_filler] * 9


if __name__ == "__main__":
    gl_turn = "X"
    gl_filler = "."
    gl_squares = [gl_filler]*9
    gl_quit_game = False
    gl_err_message = ""

    print_screen()
