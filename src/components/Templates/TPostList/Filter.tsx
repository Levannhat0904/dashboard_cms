import React from 'react'
import { FilterOption } from '../../pages/post'
import { Input } from 'antd'
import { useSearchParams } from 'react-router-dom'
import FilterSelect from '../../atoms/ASelectAuthor'
const { Search } = Input
const Filter = ({ filterData }: { filterData: FilterOption[] }) => {
  const [searchParams] = useSearchParams()
  const s = searchParams.get('s') || ''
  return (
    <>
      {filterData.map((filter) => (
        <div key={filter.name}>
          {(() => {
            switch (filter.type) {
              case 'input':
                // Render FilterInput cho input
                return (
                  <Search
                    size='large'
                    className='h-full w-60'
                    // value={meta.s}
                    defaultValue={s}
                    // onChange={handleInputSearchChange}
                    onChange={filter.onChange}
                    placeholder='input search text'
                    // onSearch={handleSearch}
                    enterButton
                  />
                )
              case 'select':
                // Render FilterSelect cho select
                return (
                  <FilterSelect
                    items={filter.items || []}
                    selectedItems={filter.selectedItems} // Hoặc selectedAssets tùy vào filter
                    onChange={filter.onChange}
                  />
                )

              default:
                return null
            }
          })()}
        </div>
      ))}
    </>
  )
}

export default Filter
