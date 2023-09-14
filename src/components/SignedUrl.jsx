import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://ujwwjqqefxojwljfvvos.supabase.co" , "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqd3dqcXFlZnhvandsamZ2dm9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzI4NzI1MywiZXhwIjoyMDA4ODYzMjUzfQ.TQY7KqF5KbpdgHw03P4B99NFribjloHIdTICIe1zZpk");


const SignedUrl = () => {

    const sign = async () => {
        const { data, error } = await supabase
            .storage
            .from('images')
            .createSignedUrl('imagesFolder/pasta.png', 60)
        console.log(data.signedUrl, "signed url");
    }

    const uploadSign = async () => {
        const { data, error } = await supabase
            .storage
            .from('images')
            .createSignedUploadUrl('imagesFolder/pasta.png')
            console.log(data,"upload sign....")
    }

    return (
        <div>
            <h4>Signed Url</h4>
            <button onClick={() => sign()}>Sign</button>
            <button onClick={()=> uploadSign()}>upload</button>
        </div>
    )
}
export default SignedUrl;