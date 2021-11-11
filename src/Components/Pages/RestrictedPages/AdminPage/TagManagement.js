import React, { useState } from "react";
import Axios from "axios";

const TagManagement = () => {

    const [newTag, setNewTag] = useState("");
    const errorAddTag = document.querySelector(".error-add-tag");

    const createNewTag = (e) => {
        e.preventDefault();
        const regex = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*{}|~<>;:[\]]{2,}$/i;
        const tagChecking = () => {
            if(regex.test(newTag)) return true;
            else {
                errorAddTag.innerHTML = "Impossible d'ajouter ce tag."
                return false;
            }
        }
        if(tagChecking()) {
            Axios({
                method: "POST",
                data: { name: newTag },
                withCredentials: true, 
                url: `http://localhost:5000/tags/createTag`
            }).then(() => {
                setNewTag("");
                errorAddTag.innerHTML = "Tag ajouté."
                setTimeout(() => {
                   errorAddTag.innerHTML = "";
                }, 2500);
            });
        };
    }

    return (
        <div>
            <h2>Tag Management</h2>
            <form onSubmit={createNewTag}>
                <input type="text" 
                    placeholder="Nouveau Tag" 
                    autoComplete="none" 
                    value={newTag} 
                    onChange={(e) => {setNewTag(e.target.value)}}
                />
                <span className="error-add-tag"></span>
                <button className="button" onClick={createNewTag}>Ajouter Tag</button>

            </form>
        </div>
    )
}

export default TagManagement
