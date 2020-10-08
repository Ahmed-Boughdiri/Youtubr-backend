
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

def get_browser():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    DRIVER = f"{dir_path}\chromedriver.exe"
    browser = webdriver.Chrome(DRIVER)
    browser.get("https://ytmp3.cc/en13/")
    return browser

def download(url):
    browser = get_browser()
    try:
        input = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located((By.ID, "input"))
        )
        input.send_keys(url)
        submit = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located((By.ID, "submit"))
        )
        submit.click()
        download = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, "Download"))
        )
        print(download.get_attribute("href"))
        # download.click()
        time.sleep(10)
    except:
        print("An Error Has Occured")

download("https://www.youtube.com/watch?v=iPGgnzc34tY")
