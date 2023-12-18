const models = require ('../models');

module.exports = {
    getAllUsers: function(req, res) {
    models.Users.findAll()
        .then(function(users) {
            if (users.length === 0) {
                res.status(200).json([]);
            } else {
                res.status(200).json(users);
            }
         })
         .catch(function(error) {
            console.error('Erreur interne:', error);
            res.status(500).json({ error: 'Une erreur interne est produite' });
         });
    },

    getAnUserById: function(req, res) {
        models.Users.findOne({
            where: { id: req.params.idUser }
        }).then(function(user) {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Utilisateur introuvable' });
            }
        }).catch(function(error){
            res.status(500).json({ error: 'Erreur interne, vérifier !' });
        });
    },
    
    createUser: function(req, res) {
        if (req.body && req.body.firstname && req.body.lastname) {
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;

            models.Users.create(
                { firstname: firstname, lastname: lastname }
            ).then(function(user) {
                res.status(200).json({ success: 'Utilisateur créé avec succès', user: user });
            }).catch(function(error) {
                res.status(500).json({ error: 'Erreur interne, veuillez vérifier !' });
            });
        } else {
            res.status(400).json({ error: 'Saisissez des identifiants valides !' });
        }
    },

    updateUser: function(req, res) {
        const id = req.body.id;

        if (!id) {
            return res.status(400).json({ error: 'Saisissez l id' });
        }

        const updatedData = {};

        if (req.body.firstname) {
            updatedData.firstname = req.body.firstname;
        }

        if (req.body.lastname) {
            updatedData.lastname = req.body.lastname;
        }

        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: 'Saisissez au moins un firstname ou lastname' });
        }

        models.Users.update(updatedData, {
            where: { id: id }
        }).then(function (rowsUpdated) {
            if (rowsUpdated[0] === 1) {
                return res.status(200).json({ success: 'Utilisateur mis à jour avec succès' });
            } else {
                return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
            }
        }).catch(function (error) {
            return res.status(500).json({ error: 'Erreur interne, veuillez vérifier !' });
        });
    },


    deleteUser: function(req, res) {

        const idUser = req.params.idUser;

	if(Number(idUser) === 1){
	    return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimé cet utilisateur' });
        }

        models.Users.destroy({
            where: { id: idUser }
        }).then(function (rowsDeleted) {
            if (rowsDeleted === 1) {
                res.status(200).json({ success: 'Utilisateur supprimé avec succès' });
            } else {
                res.status(404).json({ error: 'Aucun utilisateur trouvé' });
            }
        }).catch(function (error) {
            res.status(500).json({ error: 'Erreur interne, vérifier !' });
        });
    },
}
