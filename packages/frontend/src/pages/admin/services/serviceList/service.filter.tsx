import ListFilter from '@components/ListFilter'

interface ServiceFilterProps {
  content?: any
}

const ServiceFilter = ({ content }: ServiceFilterProps) => {
  return <ListFilter content={content}></ListFilter>
}

export default ServiceFilter
