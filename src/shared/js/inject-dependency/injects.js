/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 02/03/2016
 * Time: 11:08
 */
import React, {PropTypes, Component} from 'react';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import shallowEqual from './shallowEqual';

// @injects | @injects((provided) => provided) => all in props
// @injects({ dep: true, dep2: 'alias' }) => merge in props
// @injects((provided) => ({ dep: provided.dep, depsAlias: provided.deps2 })

// first parameter
// default to provide all (undefined)
// fn(provided) custom provide, must return an object
// object, mapping of deps to provide, can contain aliases


// second parameter
// default to true
// true => merge in props
// false => dont merge, they will be in 'dependencies' in props
// fn(provided, props) => custom function to merge
// string => dont merge, they will be in '<string>' provided in props

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// if mergeProps = false or mergeProps is a string
const makeMergeInPropsWithName = (name) => (toMerge, baseProps) => {
	return {
		...baseProps,
		[name]: {...toMerge}
	};
};

// if mergeProps = true
const makeMergeInProps = () => (toMerge, baseProps) => {
	return {
		...baseProps,
		...toMerge
	};
};
const makeDefaultMapRequiredDeps = (requiredDeps) => (providing, props) => {
	if (!requiredDeps) return {...providing};
	let result = {};
	const depNames = Object.keys(requiredDeps);
	for (let i = 0; i < depNames.length; i++) {
		const key = depNames[i];
		const name = requiredDeps[key] === true ? key : requiredDeps[key]; // alias
		result[name] = providing[key];
	}
	return result;
};

export default function injects(requiredDeps, mergeProps = true) {

	const mergePropsFn = mergeProps === false ? makeMergeInPropsWithName('dependencies') :
							(
								(isString(mergeProps)) ? makeMergeInPropsWithName(mergeProps) :
								(
									isFunction(mergeProps) ? mergeProps : makeMergeInProps()
								)
							);

	const mapRequiredDeps = isFunction(requiredDeps) ? requiredDeps : makeDefaultMapRequiredDeps(requiredDeps);

	return function wrap(WrappedComponent) {

		return class Injects extends Component {
			static contextTypes = {
				dependencies: PropTypes.object.isRequired
			};

			static displayName = `InjectDeps(${getDisplayName(WrappedComponent)})`;

			static WrappedComponent = WrappedComponent;

			constructor(props, context) {
				super(props, context);
				this.dependencies = context.dependencies;
				this.propsHasChanged = true;
				this.contextDependenciesHasChanged = true;
			}

			componentWillReceiveProps(nextProps, nextContext) {
				if (!shallowEqual(nextProps, this.props)) {
					this.propsHasChanged = true;
				}

				if (!shallowEqual(nextContext.dependencies, this.context.dependencies)) {
					this.contextDependenciesHasChanged = true;
				}
			}

			shouldComponentUpdate() {
				return this.propsHasChanged || this.contextDependenciesHasChanged;
			}

			updateDependenciesPropsIfNeeded() {
				const toInject = mapRequiredDeps(this.context.dependencies, this.props);

				if (this.dependenciesProps && shallowEqual(toInject, this.dependenciesProps)) {
					return false;
				}

				this.dependenciesProps = toInject;
				return true;
			}

			updateMergePropsIfNeeded() {
				const newMergeProps = mergePropsFn(this.dependenciesProps, this.props);

				if (this.mergedProps && shallowEqual(newMergeProps, this.mergedProps)) {
					return false
				}

				this.mergedProps = newMergeProps;
				return true;
			}

			render() {
				const { propsHasChanged, contextDependenciesHasChanged } = this;

				this.propsHasChanged = false;
				this.contextDependenciesHasChanged = false;

				let haveDependenciesChanged = false;
				if (propsHasChanged || contextDependenciesHasChanged) {
					haveDependenciesChanged = this.updateDependenciesPropsIfNeeded();
				}

				let haveMergedPropsChanged = false;
				if (propsHasChanged || haveDependenciesChanged) {
					haveMergedPropsChanged = this.updateMergePropsIfNeeded();
				}

				if (haveMergedPropsChanged || !this.element) {
					this.element = <WrappedComponent {...this.mergedProps} />;
				}

				return this.element;
			}
		}

	}
}