import ListFilter from '@components/ListFilter'

interface ClientFilterProps {
  additional?: any
}

const ClientFilter = ({ additional }: ClientFilterProps) => {
  return <ListFilter additional={additional}></ListFilter>
}

export default ClientFilter
