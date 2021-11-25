Dernier projet de la formation "Développeur web" de chez OpenClassrooms.

Démarrer le projet : 

Frontend =>
-npm install

Backend => 
-npm install
-Ajout d'un dossier images à la racine contenant une image nommée "default_image.jpg" => Utilisé comme image de profil par défaut
-Ajout d'un .env dans le dossier config avec le contenu suivant : 

PORT = 5000
DB_HOST = localhost
DB_NAME = groupomania
DB_DIALECT = mysql
SECRET_TOKEN_JWT = cf7bfca241f1d81a40900cc77ac9730d7ccd01c6de61230e5df8420e87eaeec3b66b8509255aa48c8f28878aed95007a671ab9964e6ca624df908e4475f86b0a



Projet réalisé avec React, Node, ExpressJS et Sequelize (ORM MySQL).
Seule les changements liés au profil ne sont pas automatique, MAJ d'un component à un autre ne fonctionnant pas comme prévu, de ce fait, un rechargement de page automatique à été prévu.
