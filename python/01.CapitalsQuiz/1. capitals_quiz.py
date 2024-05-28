# Endpoint used for verificaiton: https://restcountries.com/v3.1/name/France/?fields=capital
# Endpint used for getting the countries list: https://restcountries.com/v3.1/all/?fields=name
# data[0]["name"]["official"]
import time
import os
import requests
import unicodedata
import random
import json

api_data = {}
lst_coutries = []
answered = []
score = {"answered": 0, "asked": 0, "total": 0}
prev_answer = ""


def make_dict_coutry_capital():
    for country in api_data:
        if len(country["capital"]) > 0:
            str_country = country["name"]["official"]
            str_capital = strip_accents(country["capital"][0])
            lst_coutries.append([str_country, str_capital])


def get_qa() -> dict:
    int_index = random.randint(0, len(lst_coutries) - 1)
    while int_index in answered:
        int_index = random.randint(0, len(lst_coutries) - 1)
    return {"country": lst_coutries[int_index][0], "capital": lst_coutries[int_index][1]}


def next_screen():
    global prev_answer, score
    if not check_game_over():
        qa = get_qa()
        user_answer = ask_question(qa, prev_answer)
        while user_answer == "":
            user_answer = ask_question(qa, prev_answer)
        score.update({"asked": score["asked"] + 1})
        if transform_word(user_answer) == transform_word(qa["capital"]):
            score.update({"answered": score["answered"] + 1})
        prev_answer = f'Answer: Capital of [{qa["country"]}] is [{qa["capital"]}]'
        next_screen()


def check_game_over():
    if int(score["asked"]) - int(score["answered"]) >= 3:
        os.system('cls' if os.name == 'nt' else 'clear')
        print("Game Over!!!")
        print(f'Your Score: Score: [{score["answered"]}], Total: [{score["total"]}]')
        return True
    return False


def transform_word(word: str) -> str:
    new_word = word.lower().strip().replace(" ", "")
    return new_word


def ask_question(qa: dict, previous_answer: str) -> str:
    os.system('cls' if os.name == 'nt' else 'clear')
    if score["asked"] > 0:
        print(previous_answer, "\n", "\n")
    print(f'Score: {score["answered"]}, Total: {score["asked"]}')
    return str(input(f'What is the capital of: {qa["country"]}\n'))


def get_countries_with_capitals():
    global api_data
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
    url = r"https://restcountries.com/v3.1/all/?fields=name,capital"
    r = requests.get(url, headers=headers)
    api_data = r.json()
    print('Total countries found: %d' % len(api_data))

def get_countries_from_file():
    global api_data
    with open('countries.json',  encoding="utf8") as f:
        api_data = json.load(f)


def strip_accents(text):
    return ''.join(char for char in
                   unicodedata.normalize('NFKD', text)
                   if unicodedata.category(char) != 'Mn')


def show_with_delay(text):
    lst_txt = text.split("\n")
    for line in lst_txt:
        os.system('cls' if os.name == 'nt' else 'clear')
        print(line.strip())
        time.sleep(1)


if __name__ == "__main__":
    show_with_delay("""Welcome to Capitals Quiz Game! 
    Type the Capital of the given country and press enter. 
    If you get 3 answers wrong the game will end :(
    Game starts in 3 2 1 
    Go...""")
    get_countries_from_file()
    # get_countries_with_capitals()
    make_dict_coutry_capital()
    next_screen()
    print("Game Completed !!!")
