import { declare } from '@babel/helper-plugin-utils'
import { types as t } from '@babel/core'

export default declare(api => {
  api.assertVersion(7)

  return {
    name: 'pipeline-operator-backward',
    visitor: {
      BinaryExpression(path) {
        const { scope } = path
        const { node } = path
        const { operator, right } = node
        let { left } = node
        if (operator !== '<|') return

        let optimizeArrow =
          t.isArrowFunctionExpression(left) &&
          t.isExpression(left.body) &&
          !left.async &&
          !left.generator
        let param

        if (optimizeArrow) {
          const { params } = left
          if (params.length === 1 && t.isIdentifier(params[0])) {
            param = params[0]
          } else if (params.length > 0) {
            optimizeArrow = false
          }
        } else if (t.isIdentifier(left, { name: 'eval' })) {
          left = t.sequenceExpression([t.numericLiteral(0), left])
        }

        if (optimizeArrow && !param) {
          // Arrow function with 0 arguments
          path.replaceWith(t.sequenceExpression([right, left.body]))
          return
        }

        const placeholder = scope.generateUidIdentifierBasedOnNode(
          param || right
        )
        scope.push({ id: placeholder })
        if (param) {
          path.get('left').scope.rename(param.name, placeholder.name)
        }

        const call = optimizeArrow
          ? left.body
          : t.callExpression(left, [t.cloneNode(placeholder)])

        path.replaceWith(
          t.sequenceExpression([
            t.assignmentExpression('=', t.cloneNode(placeholder), right),
            call,
          ])
        )
      },
    },
  }
})
