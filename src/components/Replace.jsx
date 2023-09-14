import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://ujwwjqqefxojwljfvvos.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqd3dqcXFlZnhvandsamZ2dm9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzI4NzI1MywiZXhwIjoyMDA4ODYzMjUzfQ.TQY7KqF5KbpdgHw03P4B99NFribjloHIdTICIe1zZpk");

const Replace = ({ replace }) => {
    const [replaceFiles, setReplaceFiles] = useState(null);

    const handleSubmit = (event) => {
        setReplaceFiles(event.target.files[0])
    }

    const replacingFiles = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .storage
            .from('images')
            .update("imagesFolder/" + `${replace}`, replaceFiles, {
                cacheControl: '3600',
                upsert: true
            })
        console.log(data.path, "..........")
    }

    return (
        <div>
            <form onSubmit={replacingFiles}>
                <input type="file" name="image" onChange={handleSubmit} />
                <button type="submit">Replace</button>
            </form>
        </div>
    )
}
export default Replace;