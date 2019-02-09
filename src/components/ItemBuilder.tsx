import { createElement, useRef } from "react";
import { ItemProps } from "../types/types";
import "./../styles/ItemBuilder.css";
import { emit } from "../socket";

export interface ItemBuilderProps {
    
}

export const ItemBuilder = (props: ItemBuilderProps) => {
    const titleRef = useRef(null);
    const ownerRef = useRef(null);
    const tagsRef = useRef(null);

    const getId = () => {
        return Math.floor(Math.random() * 100);
    }

    const formatDate = () => {
        const d = new Date();
        return `${d.getMonth()+1}/${d.getFullYear()}`;
    }

    const handleSubmit = () => {
        var obj = {
            id: getId(),
            title: titleRef.current && titleRef.current.value,
            date: formatDate(),
            owner: ownerRef.current && ownerRef.current.value,
            tags: tagsRef.current && tagsRef.current.value.split(",")
        };
        emit("echo", obj);
    }

    return (
        <div className="itembuilder">
            <input type="text" placeholder="Title" ref={titleRef} />
            <input type="text" placeholder="Owner (optional)" ref={ownerRef} />
            <input type="text" placeholder="Tags (optional)" ref={tagsRef} />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}