import React, { useState } from "react";
import Axios from "axios";

const TagManagement = () => {

    const [newTag, setNewTag] = useState("");

    const createNewTag = () => {
        e.preventDefault();
        const regex = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*{}|~<>;:[\]]{2,}$/i;
        const tagChecking = () => {
            if(regex.test(newTag)) return true;
            else return false;
        }
        if(tagChecking()) {
            Axios({
                method: "POST", withCredentials: true, url: `http://localhost:5000/tag/createTag`
            })
        };

    }

    return (
        <div>
            <h2>Tag Management</h2>
            <form onSubmit={createNewTag}>
                <input type="text" placeholder="Nouveau Tag" autoComplete="none" />
            </form>
        </div>
    )
}

export default TagManagement
