import { motion } from "framer-motion";
import { InvestmentChart } from "./investment-chart";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { SlideData } from "@shared/schema";

interface SlideContentProps {
  slide: SlideData;
  isEditMode: boolean;
  onUpdateSlide: (slide: SlideData) => void;
}

const colorClasses = {
  primary: "text-primary bg-primary/10 border-primary/20",
  blue: "text-blue-600 bg-blue-50 border-blue-200",
  green: "text-green-600 bg-green-50 border-green-200",
  purple: "text-purple-600 bg-purple-50 border-purple-200",
  orange: "text-orange-600 bg-orange-50 border-orange-200",
  red: "text-red-600 bg-red-50 border-red-200",
  yellow: "text-yellow-600 bg-yellow-50 border-yellow-200",
};

export function SlideContent({ slide, isEditMode, onUpdateSlide }: SlideContentProps) {
  const handleTextEdit = (field: string, value: string) => {
    const updatedSlide = { ...slide };
    if (field === 'title' || field === 'subtitle') {
      updatedSlide[field] = value;
    } else {
      // Handle nested content updates
      // This would need to be implemented based on the specific structure
    }
    onUpdateSlide(updatedSlide);
  };

  const EditableText = ({ 
    children, 
    field, 
    className = "" 
  }: { 
    children: React.ReactNode; 
    field: string; 
    className?: string; 
  }) => (
    <div
      className={cn(
        className,
        isEditMode && "edit-mode"
      )}
      contentEditable={isEditMode}
      suppressContentEditableWarning={true}
      onBlur={(e) => handleTextEdit(field, e.target.textContent || "")}
      data-testid={`editable-${field}`}
    >
      {children}
    </div>
  );

  const renderSlideContent = () => {
    switch (slide.type) {
      case "intro":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <EditableText field="title" className="text-4xl font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="text-lg text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slide.content.sections?.map((section: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          colorClasses[section.color as keyof typeof colorClasses] || colorClasses.primary
                        )}>
                          <i className={section.icon}></i>
                        </div>
                        <h3 className="text-xl font-semibold" data-testid={`section-title-${index}`}>
                          {section.title}
                        </h3>
                      </div>
                      <ul className="space-y-3 text-sm">
                        {section.items?.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-start gap-2" data-testid={`section-item-${index}-${itemIndex}`}>
                            <i className={`${section.icon.split(' ')[1]} text-${section.color}-600 mt-0.5`}></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case "content":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <EditableText field="title" className="text-4xl font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="text-lg text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            {slide.content.challenges && slide.content.opportunities && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" data-testid="challenges-title">
                    Desafios para startups brasileiras
                  </h2>
                  {slide.content.challenges.map((challenge: any, index: number) => (
                    <Card key={index} className={cn("p-6 border", colorClasses[challenge.color as keyof typeof colorClasses])}>
                      <div className="flex items-start gap-3">
                        <i className="fas fa-exclamation-triangle mt-1"></i>
                        <div>
                          <h3 className="font-semibold mb-2" data-testid={`challenge-title-${index}`}>
                            {challenge.title}
                          </h3>
                          <p className="text-sm" data-testid={`challenge-description-${index}`}>
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" data-testid="opportunities-title">
                    Oportunidades de crescimento
                  </h2>
                  {slide.content.opportunities.map((opportunity: any, index: number) => (
                    <Card key={index} className={cn("p-6 border", colorClasses[opportunity.color as keyof typeof colorClasses])}>
                      <div className="flex items-start gap-3">
                        <i className="fas fa-rocket mt-1"></i>
                        <div>
                          <h3 className="font-semibold mb-2" data-testid={`opportunity-title-${index}`}>
                            {opportunity.title}
                          </h3>
                          <p className="text-sm" data-testid={`opportunity-description-${index}`}>
                            {opportunity.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {slide.content.strategies && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" data-testid="strategies-title">
                    {slide.content.strategies.title}
                  </h2>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <i className="fas fa-presentation text-primary"></i>
                      Estrutura de um Pitch Deck Eficaz
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {slide.content.strategies.pitchDeck?.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2" data-testid={`pitch-item-${index}`}>
                          <i className="fas fa-check text-green-600 mt-0.5"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">Dicas para apresentação:</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      {slide.content.strategies.tips?.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2" data-testid={`tip-${index}`}>
                          <i className="fas fa-lightbulb text-blue-600 mt-0.5"></i>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {slide.content.businessPlan && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold" data-testid="business-plan-title">
                      {slide.content.businessPlan.title}
                    </h2>
                    
                    <div className="space-y-4">
                      {slide.content.businessPlan.sections?.map((section: any, index: number) => (
                        <Card key={index} className="p-6">
                          <h4 className="font-semibold text-primary mb-2" data-testid={`business-section-title-${index}`}>
                            {section.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2" data-testid={`business-section-description-${index}`}>
                            {section.description}
                          </p>
                          {section.projections && (
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              {section.projections.map((projection: any, projIndex: number) => (
                                <div key={projIndex} className="text-center" data-testid={`projection-${projIndex}`}>
                                  <div className="font-semibold text-primary">{projection.year}</div>
                                  <div className="text-muted-foreground">{projection.value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {slide.content.impacts && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {slide.content.impacts.map((impact: any, index: number) => (
                    <Card key={index} className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2" data-testid={`impact-title-${index}`}>
                        <i className={impact.icon}></i>
                        {impact.category}
                      </h3>
                      <div className="space-y-4">
                        {impact.items?.map((item: string, itemIndex: number) => (
                          <div key={itemIndex} className="flex items-start gap-3" data-testid={`impact-item-${index}-${itemIndex}`}>
                            <i className="fas fa-check-circle text-green-600 mt-1"></i>
                            <p className="text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>

                {slide.content.ods && (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <i className="fas fa-globe text-blue-600"></i>
                      Alinhamento com Objetivos de Desenvolvimento Sustentável
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Contribuição direta para os ODS da ONU:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {slide.content.ods.map((ods: any, index: number) => (
                        <div key={index} className={cn(
                          "flex items-start gap-4 p-4 rounded-lg border",
                          colorClasses[ods.color as keyof typeof colorClasses]
                        )}>
                          <div className="w-12 h-12 bg-current rounded-lg flex items-center justify-center text-white font-bold opacity-90">
                            {ods.number}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1" data-testid={`ods-title-${index}`}>
                              {ods.title}
                            </h4>
                            <p className="text-sm opacity-80" data-testid={`ods-description-${index}`}>
                              {ods.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {slide.content.statistics && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {slide.content.statistics.map((stat: any, index: number) => (
                      <Card key={index} className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="text-3xl font-bold text-blue-600 mb-2 animate-count-up" data-testid={`stat-value-${index}`}>
                          {stat.value}
                        </div>
                        <p className="text-sm text-blue-700" data-testid={`stat-label-${index}`}>
                          {stat.label}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );

      case "chart":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <EditableText field="title" className="text-4xl font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="text-lg text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Volume de investimentos (2019-2024)
                </h3>
                <InvestmentChart data={slide.content.chartData} />
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {slide.content.stats?.map((stat: string, index: number) => (
                    <div key={index} className="flex items-center gap-2" data-testid={`chart-stat-${index}`}>
                      <i className="fas fa-arrow-up text-green-600"></i>
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">
                  Casos de sucesso
                </h3>
                
                {slide.content.successCases?.map((case_: any, index: number) => (
                  <Card key={index} className={cn(
                    "p-6 bg-gradient-to-r border",
                    case_.color === 'purple' && "from-purple-50 to-purple-100 border-purple-200",
                    case_.color === 'red' && "from-red-50 to-red-100 border-red-200",
                    case_.color === 'green' && "from-green-50 to-green-100 border-green-200"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg",
                        case_.color === 'purple' && "bg-purple-600",
                        case_.color === 'red' && "bg-red-600",
                        case_.color === 'green' && "bg-green-600"
                      )}>
                        {case_.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-semibold mb-1",
                          case_.color === 'purple' && "text-purple-800",
                          case_.color === 'red' && "text-red-800",
                          case_.color === 'green' && "text-green-800"
                        )} data-testid={`success-case-name-${index}`}>
                          {case_.name}
                        </h4>
                        <p className={cn(
                          "text-sm mb-2",
                          case_.color === 'purple' && "text-purple-700",
                          case_.color === 'red' && "text-red-700",
                          case_.color === 'green' && "text-green-700"
                        )} data-testid={`success-case-description-${index}`}>
                          {case_.description}
                        </p>
                        <p className={cn(
                          "text-xs",
                          case_.color === 'purple' && "text-purple-600",
                          case_.color === 'red' && "text-red-600",
                          case_.color === 'green' && "text-green-600"
                        )} data-testid={`success-case-highlight-${index}`}>
                          <strong>Destaques:</strong> {case_.highlight}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "discussion":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <EditableText field="title" className="text-4xl font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="text-lg text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">
                  Perguntas para reflexão
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  {slide.content.questions?.map((question: any, index: number) => (
                    <Card key={index} className={cn(
                      "p-6 border-l-4",
                      question.color === 'blue' && "border-l-blue-500",
                      question.color === 'green' && "border-l-green-500",
                      question.color === 'purple' && "border-l-purple-500"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                          question.color === 'blue' && "bg-blue-100",
                          question.color === 'green' && "bg-green-100",
                          question.color === 'purple' && "bg-purple-100"
                        )}>
                          <span className={cn(
                            "font-semibold text-sm",
                            question.color === 'blue' && "text-blue-600",
                            question.color === 'green' && "text-green-600",
                            question.color === 'purple' && "text-purple-600"
                          )}>
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className={cn(
                            "font-semibold mb-2",
                            question.color === 'blue' && "text-blue-800",
                            question.color === 'green' && "text-green-800",
                            question.color === 'purple' && "text-purple-800"
                          )} data-testid={`discussion-question-${index}`}>
                            {question.question}
                          </h3>
                          <p className="text-sm text-muted-foreground" data-testid={`discussion-context-${index}`}>
                            {question.context}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {slide.content.interactionSpaces && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center justify-center gap-2">
                      <i className="fas fa-comments text-blue-600"></i>
                      Espaço para interação com a turma
                    </h3>
                    <p className="text-blue-700">
                      Compartilhe suas experiências e opiniões sobre os desafios enfrentados por empreendedores e como superá-los no contexto brasileiro.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {slide.content.interactionSpaces.map((space: any, index: number) => (
                      <Card key={index} className="p-4 shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-2" data-testid={`interaction-space-title-${index}`}>
                          {space.title}
                        </h4>
                        <p className="text-sm text-gray-600" data-testid={`interaction-space-description-${index}`}>
                          {space.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {slide.content.academicContext && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <i className="fas fa-graduation-cap text-primary"></i>
                    Contexto Acadêmico e Científico
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Relevância Teórica</h4>
                      <p className="text-sm text-muted-foreground" data-testid="academic-theoretical">
                        {slide.content.academicContext.theoretical}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Aplicações Práticas</h4>
                      <p className="text-sm text-muted-foreground" data-testid="academic-practical">
                        {slide.content.academicContext.practical}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </motion.div>
        );

      case "conclusion":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <EditableText field="title" className="text-4xl font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="text-lg text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">
                  Síntese dos Aprendizados
                </h2>
                
                <div className="space-y-4">
                  {slide.content.learnings?.map((learning: any, index: number) => (
                    <Card key={index} className={cn(
                      "p-6 border",
                      colorClasses[learning.color as keyof typeof colorClasses]
                    )}>
                      <div className="flex items-start gap-3">
                        <i className="fas fa-lightbulb mt-1"></i>
                        <div>
                          <h3 className="font-semibold mb-2" data-testid={`learning-title-${index}`}>
                            {learning.title}
                          </h3>
                          <p className="text-sm" data-testid={`learning-description-${index}`}>
                            {learning.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {slide.content.futurePerspective && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <i className="fas fa-telescope text-primary"></i>
                      Perspectivas Futuras
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800" data-testid="future-perspective">
                        {slide.content.futurePerspective}
                      </p>
                    </div>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">
                  Recomendações para Startups
                </h2>
                
                <div className="space-y-4">
                  {slide.content.recommendations?.map((recommendation: any, index: number) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className={recommendation.icon}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2" data-testid={`recommendation-title-${index}`}>
                            {recommendation.title}
                          </h3>
                          <p className="text-sm text-muted-foreground" data-testid={`recommendation-description-${index}`}>
                            {recommendation.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "references":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <EditableText field="title" className="text-4xl font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="text-lg text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {slide.content.categories?.map((category: any, categoryIndex: number) => (
                <Card key={categoryIndex} className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" data-testid={`reference-category-${categoryIndex}`}>
                    <i className={`${category.icon} text-${category.color}-600`}></i>
                    {category.title}
                  </h3>
                  <div className="space-y-4 text-sm">
                    {category.references?.map((reference: any, refIndex: number) => (
                      <div key={refIndex} className={cn(
                        "border-l-4 pl-4",
                        `border-l-${reference.color}-500`
                      )}>
                        <p className="font-semibold" data-testid={`reference-title-${categoryIndex}-${refIndex}`}>
                          {reference.title}
                        </p>
                        <p className="text-muted-foreground" data-testid={`reference-description-${categoryIndex}-${refIndex}`}>
                          {reference.description}
                        </p>
                        <p className={`text-xs text-${reference.color}-600`} data-testid={`reference-url-${categoryIndex}-${refIndex}`}>
                          {reference.url}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {slide.content.footer && (
              <div className="mt-8 p-6 bg-muted rounded-lg border border-border text-center">
                <p className="text-sm text-muted-foreground" data-testid="reference-footer-created">
                  {slide.content.footer.created} | {slide.content.footer.event}
                </p>
                <p className="text-xs text-muted-foreground mt-2" data-testid="reference-footer-theme">
                  {slide.content.footer.theme}
                </p>
              </div>
            )}
          </motion.div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tipo de slide não reconhecido: {slide.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="slide-container slide-active" data-testid={`slide-content-${slide.type}`}>
      {renderSlideContent()}
    </div>
  );
}
