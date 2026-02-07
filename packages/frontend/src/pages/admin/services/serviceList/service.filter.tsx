import ListFilter from '@components/ListFilter'

interface ServiceFilterProps {
  additional?: any
}

const ServiceFilter = ({ additional }: ServiceFilterProps) => {
  return (
    <ListFilter additional={additional}>

    </ListFilter>
  )
}

export default ServiceFilter
