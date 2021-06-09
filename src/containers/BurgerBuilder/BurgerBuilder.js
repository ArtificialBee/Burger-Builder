import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }


    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({ purchaseable: sum > 0 })
    }

    addIngerdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredient = {
            ...this.state.ingredients
        }
        updateIngredient[type] = updateCount; //Updateovanje novog objekta koji sluzi za kopiranje
        const additionPrices = INGREDIENT_PRICES[type] + this.totalPrice;
        this.setState({ ingredients: updateIngredient, totalPrice: additionPrices })
        this.updatePurchaseState(updateIngredient);

    }

    removeIngerdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredient = {
            ...this.state.ingredients
        }
        updateIngredient[type] = updateCount; //Updateovanje novog objekta koji sluzi za kopiranje
        const deductionPrices = INGREDIENT_PRICES[type] - this.totalPrice;
        this.setState({ ingredients: updateIngredient, totalPrice: deductionPrices })
        this.updatePurchaseState(updateIngredient)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCloseHandler = () => {
        this.setState({ purchasing: false });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCloseHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientsAdded={this.addIngerdientHandler}
                    ingredientsRemoved={this.removeIngerdientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    orderd={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;
