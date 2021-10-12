import React from 'react'

const ConfirmDeletion = () => {
  return (
    <div className="delete-modal">
      <h1>Êtes-vous sûr de vouloir supprimer votre compte ? Ce processus est irréversible.</h1>
      <button className="cancel-btn btn">Annuler</button>
      <button className="delete-btn btn">Supprimer</button>
    </div>
  )
}

export default ConfirmDeletion
