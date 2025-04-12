import { useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'
import type { ChangeEvent } from 'react'

interface OrderTableSearchProps {
    onSearch: (query: string) => void;
}

const OrderTableSearch = () => {

    const searchInput = useRef<HTMLInputElement>(null)

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        console.log(val);
    }

   
    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        debounceFn(inputValue);
    }

    return (
        <Input
            ref={searchInput}
            className="lg:w-52"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default OrderTableSearch
