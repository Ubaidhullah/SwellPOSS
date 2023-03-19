import {Add} from '@mui/icons-material'
import { useTable } from '@pankod/refine-core'
import { Box, Stack, Typography } from '@pankod/refine-mui'
import { useNavigate } from '@pankod/refine-react-router-v6'
import { CustomButton, ItemsCard  } from 'components'


const AllItems = () => {

    const navigate = useNavigate()

    const {
      tableQueryResult: { data, isLoading, isError }
    } = useTable();

    

    const allItems = data?.data ?? []; 

    if (isLoading) return <Typography>Loading...</Typography>
    if (isError) return <Typography>Error...</Typography>

  return (
    <Box>
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={25} fontWeight={700} color='#11142d'>
        </Typography>
        <CustomButton 
        title='Add Item'
        handleClick={() => navigate('/items/create')}
        backgroundColor='#475be8'
        color='#fcfcfc'
        icon={<Add />}
        />
    </Stack>

    <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3}}>
    {
        allItems?.map((item) => (
            <ItemsCard
            key={item._id}
            id={item._id}
            itemCode={item.itemCode}
            title={item.title}
            price={item.price}
            photo={item.photo}
            />
        ))
    }
    </Box>
    </Box>
  )
}

export default AllItems
