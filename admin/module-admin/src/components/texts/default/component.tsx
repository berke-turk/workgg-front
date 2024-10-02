import Size from "@/lib/styles/size";
import React from "react";

interface TextI {
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode
}

export default function Text(textI: TextI) {
    return <span className={textI.className} style={textI.style}> {textI.children} </span>
}