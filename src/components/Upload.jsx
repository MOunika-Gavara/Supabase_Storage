import React, { useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import { TableHead, TableRow, TableCell, Table, TableBody, Button } from "@mui/material";
import Download from "./Download";
import Replace from "./Replace";

const supabase = createClient("https://ujwwjqqefxojwljfvvos.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqd3dqcXFlZnhvandsamZ2dm9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzI4NzI1MywiZXhwIjoyMDA4ODYzMjUzfQ.TQY7KqF5KbpdgHw03P4B99NFribjloHIdTICIe1zZpk");

const Upload = () => {
    const [uploadFile, setUploadFile] = useState(null);
    const [list, setList] = useState([]);
    const lists = [];
    const url = "https://ujwwjqqefxojwljfvvos.supabase.co/storage/v1/object/public/images/imagesFolder";

    const handleUpload = (event) => {
        setUploadFile(event.target.files[0])
    }

    const uploadingFiles = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase.storage
            .from("images")
            .upload("imagesFolder/" + `${uploadFile.name}`, uploadFile, {
                cacheControl: "3600",
            });
        if (data) {
            console.log(data)
        } else {
            console.log(error)
        }
    };

    //Get the details of the Bucket 
    const getBucket = async () => {
        const { data, error } = await supabase
            .storage
            .getBucket('images')
    };

    //Emptying all the files in the Bucket
    const emptyBucket = async () => {
        const { data, error } = await supabase
            .storage
            .emptyBucket('images')
    }

    //Listing all the Images
    const listImage = async () => {
        const { data, error } = await supabase
            .storage
            .from('images')
            .list('imagesFolder', {
                limit: 100,
            })
        setList(data);
        console.log(list, "100000")
    }

    list.map((o) => (
        lists.push({
            name1: o.name
        })
    ))
    console.log(lists, "new list")

    //Moving the files from one folder to other dynamically
    const movingFiles = async (image) => {
        console.log(image, "iiiiii")
        const { data, error } = await supabase
            .storage
            .from('images')
            .move("imagesFolder/" + `${image}`, "newImagesFolder/" + `${image}`)
        console.log(data, "move data")
    }

    //Copying the files from one folder to other
    const copyingFiles = async (img) => {
        const { data } = await supabase
            .storage
            .from('images')
            .copy("imagesFolder/" + `${img}`, "newImagesFolder/" + `${img}`)
        console.log(data, "copy")
    }

    return (
        <div style={{ marginTop: 100, justifyContent: "right" }}>
            <form onSubmit={uploadingFiles}>
                <input type="file" name="image" onChange={handleUpload} />
                <button type="submit">Submit</button>
                <button onClick={getBucket}>get</button>
                <button onClick={listImage}>list</button>
                <button onClick={emptyBucket}>empty</button>
            </form>
            <Table style={{ border: "2px solid" }}>
                <TableHead>
                    <TableRow >
                        <TableCell>
                            <strong>Pictures</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Move</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Copy</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Download</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Choose a File to replace</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lists.map((image) => (
                        <TableRow>
                            <TableCell>
                                <img src={url + "/" + image.name1} width="150" height="150" />
                            </TableCell>
                            <TableCell>
                                <button onClick={() => movingFiles(image.name1)}>Move</button>
                            </TableCell>
                            <TableCell>
                                <button onClick={() => copyingFiles(image.name1)}>Copy</button>
                            </TableCell>
                            <TableCell>
                                <Download image={image.name1} />
                            </TableCell>
                            <TableCell>
                                <Replace replace={image.name1} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )

}

export default Upload