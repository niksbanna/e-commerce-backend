import data from "../../data.js"

export const index = (req, res) => {
    res.send(data.products)
}