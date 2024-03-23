import { Box, Container, TextField, Typography , CardHeader, Button, Card, CardContent} from "@mui/material";
import NavBar from "./navbar";
import { useState } from "react";
import axios from "axios";


const Dashboard = () => {

    const [userNameAfterFetch,setUserNameAfterFetch] = useState('')
    const [userName,setUserName] = useState('');
    const [gender,setGender] = useState('');
    const [userAge , setUserAge] = useState(null);
    const [country, setCountry] = useState(null);

    const handleInputChange = (event) => {
        setUserName(event.target.value)
    }

    const handleSubmit = async() => {
        try{

            let resp = new Promise(async (res,rej)=>{
                const dt1 = await axios.get(`https://api.agify.io?name=${encodeURIComponent(userName)}`).then(data=>{
                    res(data);
                }).catch((err)=>{
                    rej(err)
                })
            });
            let resp1 = new Promise(async (res,rej)=>{
                const dt2 = await axios.get(`https://api.genderize.io?name=${encodeURIComponent(userName)}`).then(data=>{
                    res(data);
                }).catch((err)=>{
                    rej(err);
                })
            });
            
            let resp2 = new Promise(async (res,rej)=>{
                const dt3 = await axios.get(`https://api.nationalize.io?name=${encodeURIComponent(userName)}`).then(data=>{
                    res(data);
                }).catch((err)=>{
                    rej(err);
                })
            }); 

            
            Promise.allSettled([resp,resp1,resp2]).then(res=>{
                if(res[0].status === 'fulfilled'){
                    setUserNameAfterFetch(res[0].value.data.name)
                    setUserAge(res[0].value.data.age)
                }else{
                    setUserAge('Failed to get Age');
                    setUserNameAfterFetch('Failed to get Name')
                }
                if(res[1].status === 'fulfilled'){
                    setGender(res[1].value.data.gender);
                    setUserNameAfterFetch(res[1].value.data.name)
                }else{
                    setGender('Failed to get Gender');
                    if(!userName){
                        setUserNameAfterFetch('Failed to Get Name');
                    } 
                }
                if(res[2].status === 'fulfilled'){
                    let country_id = res[2].value.data.country.map(e => e.country_id).join(',')
                    setCountry(country_id)
                    setUserNameAfterFetch(res[2].value.data.name)
                }else{
                    setCountry('Failed to get Country Id');
                    if(!userName){
                        setUserNameAfterFetch('Failed to Get Name')
                    }
                }
            }).catch((error)=>{
                console.log(error)
            })


        }catch(error){
            console.log('Error Fetching the details: ', error);
        }
        

    }

    return (
        <div>
            <NavBar/>
                <Box sx={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
                    <Typography variant="h4" component="div" sx={{mt: 4}}>
                        Enter The Name
                    </Typography>

                </Box>
                <Box sx={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
                    <TextField label="Enter Name" variant="outlined" fullWidth value={userName} onChange={handleInputChange} sx={{mt : 2 , width: '40%',marginRight: '16px'}} />
                    <Button variant="contained" onClick={handleSubmit} sx={{mt : 2, fontSize: '1.2rem', padding: '12px 24px', color: '#FFFFFF',backgroundColor: '#008080'}}>
                        Submit
                    </Button>
                </Box>
                <Box sx={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
                    {userAge !== null && (
                    <Card sx={{mt : 2 , backgroundColor: '#FFFFFF' , width: '30%'}}>
                         <CardHeader title={`Details of ${userNameAfterFetch}`} sx={{backgroundColor: '#008080' , color: 'black'}} />
                        <CardContent>
                            <Typography variant="h6" component="div" sx={{mt : 2 }}>
                                <p><b>Name :</b>  {userNameAfterFetch}</p>
                                <p><b>Age :</b> {userAge}</p>
                                <p><b>Gender:</b> {gender}</p>
                                <p><b>Country:</b> {country}</p>
                            </Typography>
                        </CardContent>
                    </Card>
                    )}
                </Box>
        </div>
        
    )
}

export default Dashboard;