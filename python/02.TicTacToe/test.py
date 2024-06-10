import selenium
from selenium import webdriver

driver = webdriver.Chrome()
url_wiki = 'https://en.wikipedia.org/wiki/Selenium'
url_tech = "https://www.techwithtim.net/"
driver.get(url_wiki)

#Finding elements
f_id_one = driver.find_element(By.ID, 'loginForm')


print(driver.title)