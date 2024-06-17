import json
import random

from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, WebDriverException

g_driver = webdriver.Chrome()


def wait_for_element(ele_name: str, drvr: webdriver.Chrome, xpath: str):
    try:
        elem = WebDriverWait(drvr, 10).until(
            EC.visibility_of_element_located((By.XPATH, xpath))
        )
    except:
        raise Exception(f"Unable to find the element: [{ele_name}]. Exiting process.")
    return elem


def get_all_group_links() -> str:
    driver = webdriver.Chrome()
    url = 'https://en.wikiquote.org/wiki/List_of_people_by_name'
    driver.get(url)
    page_title = WebDriverWait(driver, 30).until(
        EC.visibility_of_element_located((By.XPATH, '//h1[@id="firstHeading"]/span[text()="List of people by name"]'))
    )

    if not page_title:
        raise Exception("Unable to find the main page")
    else:
        print("Main Page found")

    links = driver.find_elements(By.XPATH, '//div[@id="mw-content-text"]//a[contains(@href,"/wiki/")][b]')
    links = [i.get_attribute("href") for i in links]
    print(links)

    if not links:
        raise Exception("No group links found")
    else:
        print(f"Total group links found are: [{len(links)}]")

    output_file_name = f"links__{datetime.now().strftime('%H.%M')}.txt"
    with open(output_file_name, "w") as file:
        file.write(json.dumps(links))

    return output_file_name


def load_json_file(file_path: str) -> list:
    with open(file_path, 'r') as file:
        text = file.read()
    data = json.loads(text)
    return data


def get_all_links(links_list: list):
    all_links = []
    driver = webdriver.Chrome()
    for link in links_list:
        print(f"Processing link: [{link}]")
        driver.get(link)
        main_title = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, '//h1[@id="firstHeading"]/span[@class = "mw-page-title-main"]'))
        )

        if not main_title:
            raise Exception("Main Title not found")
        else:
            print(f"Page title: [{main_title.text}]")

        sub_links = driver.find_elements(By.XPATH, '//div[@id="mw-content-text"]//ul/li/a[@title][contains(@href,'
                                                   '"/wiki/")]')

        if not sub_links:
            raise Exception("No sub links found")
        else:
            print(f"Total Sub Links found: [{len(sub_links)}]")

        sub_links = [i.get_attribute("href") for i in sub_links]
        all_links.extend(sub_links)

    print(f"Total links found: [{len(all_links)}]")
    output_file_name = f"sub_links__{datetime.now().strftime('%H.%M')}.json"
    with open(output_file_name, 'w') as file:
        file.write(json.dumps(all_links))


def take_input_from_user(input_path: str) -> str:
    str_input = None
    term_type = None
    while not term_type:
        str_input = input("Enter a the lookup term")
        if str_input and len(str_input) > 3:
            term_type = "link" if str_input.strip().lower().startswith("https://") else "term"

    links_from_json = load_json_file(input_path)
    links_lower = [i.lower() for i in links_from_json]

    str_input = str_input.strip().lower()
    if term_type == "link":
        if str_input in links_lower:
            return links_from_json[links_lower.index(str_input)]

    if term_type == "term":
        for index, single_link in enumerate(links_lower):
            search_terms = str_input.lower().split(" ")
            if all(tr in single_link for tr in search_terms):
                return links_from_json[index]

    raise Exception("Search term did not yield any results")


def check_if_input_is_valid(link_str: str):
    g_driver.get(link_str)
    wait_for_element("Quotes Section Title", g_driver, '//div[@id="mw-content-text"]//h2[@id="Quotes"]')
    print("Quotes section found in link")


def get_quotes(link_str: str) -> str:
    list_quotes = wait_for_element("Quotes Section", g_driver, '//div[@id="mw-content-text"]//h2['
                                                               '@id="Quotes"]/parent::*/following-sibling::ul/li[1]')
    list_quotes = g_driver.find_elements(By.XPATH, '//div[@id="mw-content-text"]//h2['
                                                               '@id="Quotes"]/parent::*/following-sibling::ul/li[1]')
    list_quotes = [i.text.split("\n")[0] for i in list_quotes]
    name = link_str.rstrip('/').split('/')[-1]
    print(f"Page title: [{name}]")
    file_data = {
        name: list_quotes
    }

    output_file_name = f"quotes/{name}.json"
    with open(output_file_name, 'w') as file:
        file.write(json.dumps(file_data))

    return output_file_name


def get_random_link(limit: int, input_path: str) -> list:
    links_json = load_json_file(input_path)
    collected = []
    for i in range(limit):
        while True:
            idx = random.randint(0, len(links_json))
            if idx not in collected:
                collected.append(idx)
                break
    return_links = [links_json[i] for i in collected]
    print(f"Selected links: [{'\n'.join([i.split('/')[-1] for i in return_links])}")
    return return_links


if __name__ == "__main__":
    print("Process Started")

    while True:
        user_input = input("Enter your selection: \n1. Get Links,\n2. Specify Author to get Quotes,\n3. Get All Quotes from a random Author\n4. Get Quotes from Random Authors")
        if user_input.isdigit() and 1 <= int(user_input) <= 4:
            break

    action = ["get links", "get quotes", "random author", "random authors"][int(user_input) - 1]
    if action.strip().lower().replace(" ", "") == "getlinks":
        file_name = get_all_group_links()
        list_links = load_json_file(file_name)
        get_all_links(list_links)

    if action.strip().lower().replace(" ", "") == "getquotes":
        link = take_input_from_user("all_authors.json")
        print(f"Link found: [{link}]")
        check_if_input_is_valid(link)
        get_quotes(link)

    if action.strip().lower().replace(" ", "") == "randomauthor":
        link = get_random_link(1, "all_authors.json")[0]
        print(f"Link selected: [{link}]")
        check_if_input_is_valid(link)
        get_quotes(link)

    if action.strip().lower().replace(" ", "") == "randomauthors":
        while True:
            usr_input = input("Enter number of links: \n")

            if usr_input and usr_input.isdigit() and (0 < int(usr_input) < 50):
                usr_input = int(usr_input)
                break

        links = get_random_link(usr_input, "all_authors.json")
        failed = 0
        for link in links:
            try:
                print(f"Link selected: [{link}]")
                check_if_input_is_valid(link)
                get_quotes(link)
            except:
                failed += 1
                print(f"Extraction failed for link: [{link}]")
        print(f"Multiple extractions complete. Total: [{usr_input}], Failed: [{failed}]")
    print("Process Completed")
