import homeView from '../views/home.art'
import httpModel from '../models/http'

export const home = async (req,res,next)=>{
  
    
    res.render(homeView())
   
}