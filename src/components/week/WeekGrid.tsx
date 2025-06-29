export const WeekGreed: React.FC = () => {
    return (
        <div
            className='absolute top-0 left-0 w-full grid grid-cols-7 border'
            style={{ gridTemplateRows: 'repeat(24,calc(var(--week-row-height)*12))' }}
        >
            {Array.from({ length: 7 * 24 }).map((_, i) => (
                <div key={i} className='border-b border-l border-dashed'>
                    {i % 7 == 0 && (
                        <div className='relative -top-2 -left-15 leading-none w-12 text-end text-sm text-muted-foreground'>
                            {i / 7}:00
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WeekGreed;