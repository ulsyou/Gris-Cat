import { Grid, GridItem } from '@chakra-ui/react'

import {
  AdminNavMenu,
  Sider,
  useAdminLayoutStore,
} from '../../components/UI-Components/admin'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useAdminLayoutStore((s) => s.isOpen)

  return (
    <Grid
      className="admin-layout"
      minHeight="100vh"
      width="100vw"
      maxWidth="100vw"
      bgColor="gray.100"
      transition="ease-in-out 0.5"
      gridTemplateColumns={isOpen ? '180px 1fr' : '64px 1fr'}
      gridTemplateRows={'auto 1fr'}
      templateAreas={{
        base: `"header header"
                  "content content"
                  "content content"`,
        md: `"header header"
                  "asider content"
                  "aside content"`,
      }}
    >
      <GridItem area={'header'} className="header">
        <AdminNavMenu />
      </GridItem>

      <GridItem area="asider" className={`aside ${isOpen && 'open'}`}>
        <Sider />
      </GridItem>

      <GridItem area="content" className={`main ${isOpen ? 'open' : ''}`}>
        {children}
      </GridItem>
    </Grid>
  )
}

export default AdminLayout
