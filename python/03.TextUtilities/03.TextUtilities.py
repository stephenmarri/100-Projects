import inspect
import os
import re
import sys

import pyperclip


def md_to_html():
    print_called_function_name()
    while True:
        print("Enter a MarkDown link or N to exit and Ctrl+Z to end input :\n")
        user_input = sys.stdin.read()
        os.system('cls')
        if user_input.strip() in ['n', "N"]:
            return
        if not user_input:
            print("No Input given")
        else:
            lines = user_input.split("\n")
            result = ""
            for line in lines:
                line = line.strip()
                md_name, md_link = find_md_name_link(line)
                new_link = f'<a href={md_link} target="_blank">{md_name}</a>'
                result = result + new_link + "\n"
            pyperclip.copy(result)
            print(result)


def find_md_name_link(arg_input: str) -> list:

    md_name, md_link = "", ""
    link_pattern = re.compile(r'(\(.*\))')
    name_pattern = re.compile(r'\.?([\w\s]*)\s*-?\s*[^^]\[')
    name_pattern_two = re.compile(r'\[(.+)]')

    link_matches = link_pattern.finditer(arg_input)
    name_matches = name_pattern.finditer(arg_input)
    name_matches_two = name_pattern_two.finditer(arg_input)

    for match in link_matches:
        md_link = match.group(1)

    if re.search(name_pattern, arg_input):
        for match in name_matches:
            md_name = match.group(1)
            md_name = md_name.replace("-", "").strip()
    else:
        for match in name_matches_two:
            md_name = match.group(1)
            md_name = md_name.strip()

    return [md_name, md_link]


def capitalize(operation, o_type="Capitalize"):
    print_called_function_name()
    while True:
        print("Enter the input string or N to exit and Ctrl+Z to end input: \n")
        user_input = sys.stdin.read()
        os.system('cls')
        if user_input.strip().lower() in ['n']:
            return
        if not user_input:
            print("No input given")
        else:
            result = ""
            if o_type.strip().lower() == "capitalize":
                is_first_char = True
                for word in user_input:
                    result += operation(word) if is_first_char else word
                    if word == " ":
                        is_first_char = True
                    else:
                        is_first_char = False
            else:
                for word in user_input:
                    result += operation(word)
            print(result)
            pyperclip.copy(result)


def print_called_function_name():
    # Get the current stack frame
    current_frame = inspect.currentframe()
    # Get the caller's frame
    caller_frame = current_frame.f_back
    # Get the name of the caller function
    caller_function_name = caller_frame.f_code.co_name
    print("Caller function name:", caller_function_name)


def check_if_input_valid(input_str: str) -> bool:
    if not input_str or not input_str.isdigit():
        return False
    if not int(input_str) in range(1, 5):
        return False
    return True


def main():
    str_input = None
    print('Welcome to text utiltiies!')
    while not check_if_input_valid(str_input):
        os.system('cls')
        str_input = input("\n1.Md links\n2.Capitalize\n3.Upper Case\n4.Lower Case\nSelection function:")

    if int(str_input) == 1:
        print(md_to_html())
    if int(str_input) == 2:
        print(capitalize(lambda x: x.upper()))
    if int(str_input) == 3:
        print(capitalize(lambda x: x.upper(), "Upper"))
    if int(str_input) == 4:
        print(capitalize(lambda x: x.lower(), "Lower"))


if __name__ == "__main__":

    while True:
        main()
        once_more = str(input("Do you want to go again?(y\\n): "))
        if once_more not in ['y', "y"]:
            break
