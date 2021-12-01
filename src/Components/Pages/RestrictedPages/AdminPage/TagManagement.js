import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "../Header"
import { GrFormClose } from "react-icons/gr";

const TagManagement = () => {

    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState([]);
    const errorAddTag = document.querySelector(".error-add-tag");
    const messageTag = document.querySelector(".message-tag");

    const displayTagList = async() => {
        const response = await fetch("http://localhost:5000/tags/getTags");
        const tags = await response.json();
        setTags(tags.data);
    };

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
                displayTagList();
                setNewTag("");
                errorAddTag.innerHTML = "Tag ajouté."
                setTimeout(() => {
                   errorAddTag.innerHTML = "";
                }, 2500);
            });
        };
    };

    useEffect(() => {
        displayTagList()
    }, []);

    return (
        <>
            <Header />
            <div className="tag-container">
                <h2>Tag Management</h2>
                <form onSubmit={createNewTag}>
                    <input type="text"
                        className="add-tag-input"
                        placeholder="Nouveau Tag"
                        aria-label="Ajout de tag"
                        autoComplete="none" 
                        value={newTag} 
                        onChange={(e) => {setNewTag(e.target.value)}}
                    />
                    <span className="error-add-tag"></span>
                    <button className="button" onClick={createNewTag}>Ajouter Tag</button>
                </form>
                <div className="tag-list">
                    {tags.map((tag) => {
                        const { id, name } = tag;

                        const deleteTag = (e) => {
                            e.preventDefault();
                            Axios({
                                method: "DELETE",
                                withCredentials: true,
                                url: `http://localhost:5000/tags/${id}/deleteTag`
                            }).then(() => {
                                displayTagList();
                                messageTag.innerHTML = "Tag supprimé."
                                setTimeout(() => {
                                    messageTag.innerHTML = "";
                                }, 2000);
                            });
                        };

                        return(
                            <div className="tag-admin" key={id}>
                                <GrFormClose onClick={deleteTag}  className="cross"/>
                                <span>{name}</span>
                            </div>
                        )
                    })}
                    <div className="message-tag"></div>
                </div>
            </div>
        </>
    )
}

export default TagManagement
