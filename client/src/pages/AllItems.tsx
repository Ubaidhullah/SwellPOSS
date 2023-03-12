import {Add} from '@mui/icons-material'
import { useList } from '@pankod/refine-core'
import { Box, Stack, Typography } from '@pankod/refine-mui'
import { useNavigate } from '@pankod/refine-react-router-v6'

import { ItemCard, CustomButton } from 'components'

const AllItems = () => {

    const navigate = useNavigate()
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
    </Box>
  )
}

export default AllItems
