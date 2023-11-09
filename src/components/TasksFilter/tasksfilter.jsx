import propTypes from 'prop-types';
import "./taskfilter.css";

const TaskFilter = ( {filter, currentFilter }) => {
	return (
	<ul className="filters">
	<li>
		<button className={currentFilter === 'all' ? 'selected' : '' }
		onClick={() => {
			filter ('all');
		}}
		>
			All
			</button>
	</li>
	<li>
          <button className={currentFilter === 'active' ? 'selected' : ''}
					onClick={() => {
						filter ('active');
					}}
					>
						Active
						</button>
        </li>

				<li>
          <button className={currentFilter === 'completed' ? 'selected' : ''}
					onClick={() => {
						filter ('active');
					}}
					>
						Completed
						</button>
        </li>
      </ul>
	);
};

TaskFilter.defaultpProps = {
	filter: () => {},
	currentFilter: 'all',
};

TaskFilter.propTypes = {
	filter: propTypes.func,
	currentFilter: propTypes.oneOf(['all', 'active', 'completed']),
};


export default TaskFilter;
