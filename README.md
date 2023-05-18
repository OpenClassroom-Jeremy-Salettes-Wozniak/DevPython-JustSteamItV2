# DevPython-JustSteamItV2

## Installation
- Installez l'api du projet et executez la
- Télécharger le repos du projet 
- Dans ControllerFilm.js qui se trouve dans backend il y a une variable qui s'appelle "let port = <port>;"
- Utilisé le port utilisé par l'API


## MVC
Mon projet utilise une architecture MVC Model View Controller
- frontend
    - index.html point d'entrer dans le code
    - assets/style/style.css contient la partis graphique du projet
- backend
    - main.js Execute le controller
    - controllers/ControllerFilm.js va chercher les données de l'api et les envoyer dans la vue pour executez l'ensemble.
    - models/ModelApi.js Récupération de la donnée de l'api
    - models/ModelFilm.js Une fois les données dans le controller ce derniers envoie une url qui va cherche les informations détailler du filme.
    - views/ViewFilm.js C'est toute la partis affichage des images, titre, information générer de maniere dynamique.

## Difficulté rencontrer 
Probleme 1 :
La premiere difficulté est que je n'ai qu'un jour de formation le vendredi le reste du temps je travaille en entreprise sur d'autre technologie (PHP, Prestashop, SPIP)
La difficulté à reprendre un projet au bout d'une semaine complique la tâche et cela sans compte que mes weekend son prit par ma vie de famille (j'ai deux enfants)

Probleme 2 : 
Sur m'a premiere version j'ai générer beaucoup de code et me suis vite perdu dans ce derniers, non prise en charge de classe, que des functions sans MVC

Probleme 3 : 
La version actuelle n'est pas vraimment optimisé, répétition de code. J'ai voulu optimisé cela, mais j'ai rencontrer un bloquage et on m'a conseille de le presenter comme tel, 
car j'ai perdu beaucoup de temps sur le projet.


