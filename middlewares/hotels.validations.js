export const validateHotelPhone = (req, res, next) =>{
    const {body} = req

    try{
        if(body.phone !== undefined){
            if(isNaN(body.phone)) return res.send(
                {
                    success: false,
                    message: 'El Telefono solo puede contener numeros'
                }
            )
        }
        next()
    }catch(e){
        console.error(e)
    }
}

export const validateHotelDelete = (req, res, next) =>{
    const {confirm} = req.body

    try{
        if(confirm !== '123456') return res.status(400).send(
            {
                success: false,
                message: 'Se necesita un codigo de confirmacion para realizar esta accion'
            }
        )
        next()
    }catch(e){
        console.error(e)
    }
}