# Groupomania

README Groupomania

Bonjour et bienvenue sur le dernier projet de la formation OpenClassrooms du parcours Développeur Web !

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés. Votre directrice, Stéphanie, vient de signer un nouveau contrat avec Groupomania, un groupe spécialisé dans la grande distribution, et l'un des plus fidèles clients de l'agence. 
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

#FONCTIONNALITÉS

Sur le site, vous avez la possibilité de:
- Créer un compte à l’aide de votre nom ou pseudo ainsi qu’un mail et un mot de passe de votre choix
- Postez des images ou un texte sous forme de post
- Liker les posts
- Modifier ou supprimer les posts que vous avez créer
- Modifier votre photo de profil
- Vous déconnectez de votre session

#TECHNOLOGIES 

MYSQL - VUEJS - NODEJS - EXPRESS

#INSTALLATION

Pour installer le projet, vérifier que vous avez installez ces 3 outils:
- Git:  https://git-scm.com/downloads 
- NodeJs: https://nodejs.org/en/
- MySql: https://dev.mysql.com/downloads/installer/

#GIT

Créer un dossier vide du nom de votre choix et utiliser la commande git clone dans votre terminal à l’intérieur de votre dossier:

Git clone https://github.com/LefClem/Groupomania.git

#MYSQL

Il existe un fichier .env qui correspond au variable d’environnement du projet.
Pour effectuer la connexion à la base de donnée, il faut renseigner votre nom d’utilisateur MySql (root par défaut) ainsi que votre mot de passe.

DB_USER=
DB_PASSWORD=

Ouvrez MySql via votre terminal avec la commande suivante:
- mysql -u root -p 
et entrer votre mot de passe.

Entrer les commandes suivantes:
CREATE DATABASE groupomania;
USE groupomania;

Importer ensuite le fichier de la base donnée groupomania.sql avec la commande suivant:
source (copier le chemin d’accès vers le fichier groupamnia.sql et le coller ici sans parenthèse)

#BACKEND

Ouvrir le terminal dans le dossier backend puis écrire les commandes suivantes:
npm install
npm run start

#FRONTEND

Ouvrir le terminal dans le dossier backend puis écrire les commandes suivantes:
npm install
npm run serve

Lorsque le serveur est lancé, accéder au navigateur à l’adresse http://localhost:8080/

#MODÉRATION

Le site comprend un compte admin pour la modération des posts. L’admin possède un droit de modification et de suppression de l’ensemble des posts de la plateforme.

Voici les accès:
admin@mail.com
Moderation2022!

À très vite sur le site !
