import { SelectOption, SelectProps } from './select.type';
import styles from './select.module.css';
import { useEffect, useRef, useState } from 'react';

function Select({ multiple, value, onChange, options }: SelectProps) {
    const [show, setShow] = useState(false);
    const [highlighted, setHighlighted] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const clearOption = () => {
        if (multiple) {
            onChange([]);
        } else {
            onChange(undefined);
        }
    };

    const selectOption = (option: SelectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter((val) => val != option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (value != option) onChange(option);
        }
    };

    const isOptionSelected = (option: SelectOption) => {
        return option == value;
    };

    useEffect(() => {
        if (show) setHighlighted(0);
    }, [show]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return;

            switch (e.code) {
                case 'Enter':
                case 'Space': {
                    setShow((c) => !c);
                    if (show) selectOption(options[highlighted]);
                    break;
                }
                case 'ArrowUp':
                case 'ArrowDown': {
                    if (!show) {
                        setShow(true);
                        break;
                    }
                    const newValue =
                        highlighted +
                        (e.code === 'ArrowDown'
                            ? 1
                            : e.code === 'ArrowUp'
                            ? -1
                            : 0);
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlighted(newValue);
                    }
                    break;
                }
                case 'Escape': {
                    setShow(false);
                }

                default:
            }
        };
        containerRef.current?.addEventListener('keydown', handler);

        return () => {
            containerRef.current?.removeEventListener('keydown', handler);
        };
    }, [show, highlighted, options]);

    return (
        <div
            ref={containerRef}
            onClick={() => setShow((c) => !c)}
            onBlur={() => {
                setShow(false);
            }}
            className={styles.container}
            tabIndex={0}
        >
            <span className={styles.value}>
                {multiple
                    ? value.map((val) => {
                          return (
                              <button className={styles.badge} key={val.label}>
                                  {val.label}
                                  <span
                                      className={styles['remove-btn']}
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          onChange(
                                              value.filter((v) => v != val)
                                          );
                                      }}
                                  >
                                      &times;
                                  </span>
                              </button>
                          );
                      })
                    : value?.label}
            </span>
            <button
                className={styles['clear-btn']}
                onClick={(e) => {
                    e.stopPropagation();
                    clearOption();
                }}
            >
                &times;
            </button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${show ? styles.show : ''}`}>
                {options.map((option, index) => (
                    <li
                        className={`${styles.option} ${
                            highlighted == index ? styles.highlighted : ''
                        } ${isOptionSelected(option) ? styles.selected : ''}`}
                        key={`${option.value}`}
                        onMouseEnter={() => setHighlighted(index)}
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(option);
                            setShow(false);
                        }}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Select;
