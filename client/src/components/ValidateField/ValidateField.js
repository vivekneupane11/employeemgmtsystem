

const ValidateField = (fields) => {
  const errors = {}
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(Object.keys(fields)[0]==='email'){
      if(fields["email"]===''){
          errors["isValidEmail"]=false;
          errors["email"]='Email is Empty'
          errors["isEmailEmpty"]=true;
      }
      else if(!re.test(fields["email"])){
          errors["isValidEmail"]=false;            
          errors["email"]='InValid Email Address'
      }else{
          errors["email"]='';  
          errors["isValidEmail"]=true;            
      }
  }
  if(Object.keys(fields)[1]==='password'){
      if(fields["password"]===''){
          errors["isValidPassword"]=false;            
          errors["password"]='Password is Empty'
          errors["isPasswordEmtpy"]=true;

      }
      else if(fields["password"].length<6){
          errors["isValidPassword"]=false;            
          errors["password"]='Password must be atleat 6 charcters length'
      }
      else{
          errors["isValidPassword"]=true;  
          errors["password"]='';  

      }
  }
  if(errors["isValidEmail"]&&errors["isValidPassword"]){
      errors["isValidForm"]=true;
      
  }else{
  errors["isValidForm"]=false;
  }
  return errors;
}

export default ValidateField