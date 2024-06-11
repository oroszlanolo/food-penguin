# FoodPenguin

This project is a home recipe book and cooking assistant. You can store your own recipes, or recipes from the web. In addition to viewing the recipes, you can get random recipe suggestions, recipes that you have not used for a long time, recipes based on the ingredients in your fridge, or even plan a good menu for the entire week.

## How it is working

The application is built in **Angular**, using **Tailwindcss** CSS framework and the **daisyUI** component library.
The app communicates with a **Nodejs** REST API. The backend is responsible for:
* validating logins
* storing and managing recipes
* storing images
* scraping recipes from various websites
The backend is running on my home server in a **docker** container. **MongoDB** is used to store recipe data.

Most of APIs are available without authentication, but some of them are only enabled for logged in users. (e.g. deleting or updating recipes).

The app uses **google oauth**, and only the users enabled on server-side can log into the app. (The app is for internal usage so only my family can log in currently).


## Features

* Show recipes
  * Show recipes by category
* Search for recipes
  * Simple search
  * Search by attributes like preparation time or dish type
* view recipe
    * step-by-step cooking
    * show all the information
    * show image (can scroll through all the images)
    * Images for the different steps?
    * ingredients
      * serving number can be changed to change ingredient quantity
      * ingredients are clickable to search for recipes including the ingredient
      * ingredients can be added to shopping list
* Add recipe
  * A new recipe can be added by giving the necessary information
  * Recipe infos are given with dropdowns
  * ingredients and directions use a dynamic number of inputs
  * Images can be uploaded to the recipe, or given by a link
  * images can be removed from a recipe
* Edit recipe
  * Same as above
* Import recipe
  * Send a link to the server, and the server gets the recipe from the link
  * After scraping the recipe, it can be edited by the user, before adding it to the database
* Shopping list
  * Can view the items
  * Can add new item
    * with and w/o quantity
  * Can cross items on the list
  * Can clear crossed items
* What is in my fridge
  * Basically a "search by ingredient"
  * Search for recipes that include only the selected ingredients, or allow other ones as well?
* Theme change
* Mobile view

icons: https://www.vecteezy.com/members/artprodite?utf8=%E2%9C%93&uploads_term=penguin&sort_by=popular&uploads_content_type=all&license_type=all