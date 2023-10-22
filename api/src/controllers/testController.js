
export const test = (req,res) => {
  try {
  res.status(200).json({message: 'test'})
  } catch (error) {
    console.log(error);
  }
  
};
