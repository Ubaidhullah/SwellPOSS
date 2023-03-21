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

    <Box mt="20px" sx={{display: 'flex', flexWrap: 'wrap', gap: 3}}>
    <Stack direction="column" width="100%">
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          {!allItems.length ?'There are no items' : ' All Items'}
        </Typography>
        <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap" >
        <Box display="flex" gap={2} flexWrap="wrap" mb={{xs: '20px', sm: 0}}>
         
        <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            mb={{ xs: "20px", sm: 0 }}
                        >
                            <CustomButton
                                title={`Sort price ${
                                    currentPrice === "asc" ? "↑" : "↓"
                                }`}
                                handleClick={() => toggleSort("price")}
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                            />
                            <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Search by title"
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value
                                                ? e.currentTarget.value
                                                : undefined,
                                        },
                                    ]);
                                }}
                            />
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues.itemType}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "propertyType",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {[
                                    "Apartment",
                                    "Villa",
                                    "Farmhouse",
                                    "Condos",
                                    "Townhouse",
                                    "Duplex",
                                    "Studio",
                                    "Chalet",
                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type.toLowerCase()}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
    </Stack> 
    </Box>

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
