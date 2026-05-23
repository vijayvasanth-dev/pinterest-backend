import Pin from '../model/pinmodel.mjs'
import cloudinary from '../config/cloudinary.mjs';



//get 
export const getpin = async(req, res) => {
    try {
        const pins = await Pin.find()
        return res.status(200).json(pins)

    } catch (error) {

        console.error(error)

        return res.status(500).json({ message: "Server error", error: error.message })
    }
}



// post 

export const postPin = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description || !req.file) {
            return res.status(400).json({ message: 'Title, description, and image are required' });
        }

        // upload image buffer to cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'pinterest' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(req.file.buffer);
        });

        const newPin = new Pin({
            title,
            description,
            imageUrl: uploadResult.secure_url, // cloudinary URL
            likes: 0,
            comment: []
        });

        const savedPin = await newPin.save();
        return res.status(201).json({ message: 'Pin created successfully', pin: savedPin });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// put 
export const putPin = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, description, imageUrl, likes, comment } = req.body;

        const updatedPin = await Pin.findByIdAndUpdate(
            id,
            { title, description, imageUrl, likes, comment },
            { new: true, runValidators: true }
        );

        if (!updatedPin) {
            return res.status(404).json({ message: "Pin not found" });
        }

        return res.status(200).json({ message: "Pin updated successfully", pin: updatedPin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error"});
    }
};

// delete
export const deletePin = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedPin = await Pin.findByIdAndDelete(id);

        if (!deletedPin) {
            return res.status(404).json({ message: "Pin not found" });
        }

        return res.status(200).json({ message: "Pin deleted successfully", pin: deletedPin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



// add this in your pin controller
export const likePin = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedPin = await Pin.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },  // increment by 1
            { new: true }
        );

        if (!updatedPin) {
            return res.status(404).json({ message: 'Pin not found' });
        }

        res.status(200).json({ likes: updatedPin.likes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
