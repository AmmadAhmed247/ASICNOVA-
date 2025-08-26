import React from 'react'
import UnderConstruction from '../pages/UnderConstruction/UnderConstruction'




export default function ConstructionRoute({path, element}){

    if(!element){
        return <UnderConstruction/>
    }

    const underConstructionRoutes = import.meta.env.VITE_UNDER_CONSTRUCTION ? import.meta.env.VITE_UNDER_CONSTRUCTION.split(',').map(r => r.trim()) : []


    if(underConstructionRoutes.includes(path)){
        return <UnderConstruction/>
    }

    return element;
}