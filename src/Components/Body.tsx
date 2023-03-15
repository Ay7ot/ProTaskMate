import { useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext'
import { logout } from '../Functions/Functions'
import useWindowDimensions from '../Hooks/windowDimensions'
import AsideBoards from './AsideBoards'
import NewColumn from './NewColumn'

export default function Body() {

    const { currentBoard, Boards } = useAuth()
    
    const {height} = useWindowDimensions()
    const newHeight = height-96
    const style = {
        height: newHeight
    }

    return (
        <div className='px-4 py-6 md:px-10 overflow-x-scroll bodyScrollbarH flex md:ml-[300px] scrollbar' style={style}>
            {currentBoard?.columns.map((column, index)=>{
                const tasks = column.tasks || []
                const length = tasks.length
                return (
                    <div key={`${column.id}${index}`} className={` min-w-[17.5rem] flex flex-col mr-8 h-full text-white overflow-y-scroll no-scrollbar p-1`}>
                        <div className='flex items-center gap-2 tracking-[2.4px] font-semibold text-[0.75rem] text-[#828fa3]'>
                            <div className='h-[15px] w-[15px] bg-[#49C4E5] rounded-full'></div>
                            <h3>{`${column.name.toUpperCase()}(${length})`}</h3>
                        </div>
                        <div className={`mt-6 ${length === 0 ? 'outline-dashed h-full outline-[#2B2C37] outline-2 rounded-lg' : ''}`}>
                        {column.tasks && column.tasks.map((task, index) => {
                            const subtasks = task.subtasks || []
                            const number = subtasks.filter(item => item.isCompleted).length
                            return (
                                <div key={`${task.id}${index}`} className='flex text-left flex-col w-full min-h-[5.5rem] bg-[#2B2C37] border-[1px] py-6 px-4 border-[#8686861a] rounded-lg shadow-lg shadow-[#364e7e1a] mb-6 transition delay-200 ease-in hover:opacity-40'>
                                    <h4 className='text-[0.9375rem] font-semibold text-white mb-2  clamp overflow-hidden text-ellipsis'>{task.title}</h4>
                                    <p className='text-[0.75rem] font-semibold text-[#828fa3]'>{`${number} of ${subtasks.length} subtasks`}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )
            })}
            <NewColumn />
        </div>
    )
}