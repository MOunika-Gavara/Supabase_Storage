import React from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://ujwwjqqefxojwljfvvos.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqd3dqcXFlZnhvandsamZ2dm9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzI4NzI1MywiZXhwIjoyMDA4ODYzMjUzfQ.TQY7KqF5KbpdgHw03P4B99NFribjloHIdTICIe1zZpk");

const Download = ({ image }) => {

    console.log({ image }, "iiiiii");

    async function downloadImage() {
        try {
            const { data, error } = await supabase
                .storage
                .from('images')
                .download("imagesFolder/" + `${image}`);
            if (error) {
                console.log(error, "error");
                return;
            }
            const blob = new Blob([data], { type: 'image/png' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'downloaded-image.png';
            anchor.click();
            window.URL.revokeObjectURL(url);
            console.log('Image downloaded successfully');
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
    return (
        <div>
            <button onClick={downloadImage}>Download</button>
        </div>
    )
}

export default Download;