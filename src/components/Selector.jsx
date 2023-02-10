import {
  AiFillCaretLeft as PreviousIcon,
  AiFillCaretRight as NextIcon,
} from 'react-icons/ai';

export default function Selector({
  children = [
    { id: 'o1', description: '2003' },
    { id: 'o2', description: '2004' },
  ],
  selected = 'o2',
  onSelectChange = null,
  onNext = null,
  onPrevious = null,
}) {
  const isFirstOption = selected === children[0].id;
  const isLastOption = selected === children[children.length - 1].id;

  function handleChange({ currentTarget }) {
    if (onSelectChange) {
      const newValue = currentTarget.value;
      onSelectChange(newValue);
    }
  }

  function handlePreviousIconClick() {
    if (!isFirstOption && onPrevious) {
      onPrevious();
    }
  }

  function handleNextIconClick() {
    if (!isLastOption && onNext) {
      onNext();
    }
  }

  const previousIconClassNames = isFirstOption
    ? 'text-gray-200 cursor-none'
    : 'text-gray-900 cursor-pointer';

  const nextIconClassNames = isLastOption
    ? 'text-gray-200 cursor-none'
    : 'text-gray-900 cursor-pointer';

  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <PreviousIcon
        className={previousIconClassNames}
        size={24}
        onClick={handlePreviousIconClick}
      />

      <select value={selected} onChange={handleChange}>
        {children.map(({ id, description }) => {
          return (
            <option key={id} value={id}>
              {description}
            </option>
          );
        })}
      </select>

      <NextIcon
        className={nextIconClassNames}
        size={24}
        onClick={handleNextIconClick}
      />
    </div>
  );
}
