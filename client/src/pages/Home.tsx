import { Box, Typography, Stack } from '@pankod/refine-mui'
import { useList } from '@pankod/refine-core'

import {
  PieChart,
  ItemsReferrals,
  TotalRevenue,
  ItemsCard,
  TopItem
} from 'components'

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#111420'>
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Items for Sale"
                    value={684}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Items Sold"
                    value={550}
                    series={[60, 40]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Total customers"
                    value={5684}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Expenses"
                    value={555}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
            </Box>

            <Stack mt="25px" width="100%" 
            direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <TotalRevenue />
            <ItemsReferrals />

            </Stack>

      </Box>

    
  )
}

export default Home
