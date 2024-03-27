import Genre from "../models/Genre.js";


export const createGenre = async(req, res) => {
    try{
        const {name} = req.body;

        if(!name){
            return res.status(400).json({
                success: false,
                message: "Please provide genre name",
            })
        }

        const exist = await Genre.findOne({name});

        if(exist){
            return res.status(400).json({
                success: false,
                message: "Genre name already exists",
            })
        }

        const genre = await Genre.create({
            name
        })

        return res.status(200).json({
            success: true,
            genre
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error while creating genre",
        })
    }
}


export const updateGenre = async(req, res) => {
    try{
        const {name} = req.body;
        console.log(name);
        console.log("req.body", req.body.name);
        const {id} = req.params;

        if(!name){
            return res.status(400).json({
                success: false,
                message: "Please provide genre name",
            })
        }
        
        const updated = await Genre.findByIdAndUpdate(id, {
            name
        },{new: true});

        return res.status(200).json({
            success: true,
            message: "Genre updated successfully",
            updated
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error while updating genre",
        })
    }
}


export const deleteGenre = async(req, res) => {
    try{
        const {id} = req.params;

        const deleted = await Genre.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Genre deleted successfully",
            deleted
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error while deleting genre",
        })
    }
}

export const getAllGenres = async(req, res) => {
    try{
        const genres = await Genre.find();
        return res.status(200).json({
            success: true,
            genres
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error while getting genres",
        })
    }
}

export const getGenre = async(req, res) => {
    try{
        const {id} = req.params;

        const genre = await Genre.findById(id);

        return res.status(200).json({
            success: true,
            genre
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error while getting genre",
        })
    }
}