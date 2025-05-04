import Hotel from '../hotels/hotels.model.js'

export const addHotel = async(req, res) =>{
    try{
        let data = req.body
        let hotel = new Hotel(data)

        await hotel.save()
        return res.send(
            {
                success: true,
                message: 'Hotel save',
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error AddHotel'})
    }
}

export const getHotel = async(req, res) =>{
    try{
        const {limit = 20, skip = 0, name, quality, sort} = req.query

        let filter = {}
        let sortOption = {}

        if(name)
            filter.name = {$regex: name, $options: 'i'}

        if(quality)
            filter.quality = quality

        if(sort === 'asc')sortOption.name = 1
        else if (sort === 'desc') sortOption.name = -1


        const hotel = await Hotel.find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sortOption)

            if(hotel.length === 0){
                const hasFilters = Object.keys(filter).length > 0
     
                return res.status(404).send(
                 {
                     success: false,
                     message: hasFilters ? 'No se han encontrado hoteles con los filtros proporcionados'
                         : 'o ha implementado mal los filtros',
                     suggestions: hasFilters ? [
                         'Intente con filtros de búsqueda diferentes',
                         'o Consulte el catálogo completo sin filtros'
                     ] : []
                 }
                )
             } 

             return res.send(
                {
                    success: true,
                    message: 'Hotel found',
                    hotel
                }
            )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error GetHot'})
    }
}

export const updateHote = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const updateHot = await Hotel.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        
        if(!updateHot) return res.status(404).send(
            {
                success: false,
                message: 'Hotel not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Hotel found',
                product: updateHot
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error updateHote'})
    }
}

export const deleteHote = async(req, res) => {
    try{
        let {id} = req.params
        
        const hotel = await Hotel.findById(id)
        if(!hotel) return res.status(404).send(
            {
                success: false,
                message: 'Hotel not found'
            }
        )

        await Hotel.deleteOne(hotel)
        return res.send({message: 'Hotel deleted'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error deleteHote'})
    }
}


